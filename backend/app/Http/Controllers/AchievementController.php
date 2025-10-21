<?php

namespace App\Http\Controllers;

use App\Models\Achievement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class AchievementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Achievement::query();

        if ($request->has('level') && $request->level !== 'Semua') {
            $query->where('level', $request->level);
        }

        if ($request->has('year')) {
            $query->where('year', $request->year);
        }

        if ($request->has('search')) {
            $query->where(function($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('participant', 'like', '%' . $request->search . '%');
            });
        }

        $achievements = $query->orderBy('year', 'desc')
                              ->orderBy('date', 'desc')
                              ->get();

        return response()->json([
            'success' => true,
            'data' => $achievements
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'participant' => 'required|string|max:255',
            'level' => 'required|in:Nasional,Provinsi,Kabupaten/Kota,Sekolah',
            'rank' => 'nullable|string|max:50',
            'year' => 'required|integer|min:2000|max:' . (date('Y') + 1),
            'date' => 'nullable|date',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->all();

        // Handle image upload
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('achievements', 'public');
            $data['image'] = $imagePath;
        }

        $achievement = Achievement::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Achievement created successfully',
            'data' => $achievement
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Achievement $achievement)
    {
        return response()->json([
            'success' => true,
            'data' => $achievement
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Achievement $achievement)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'participant' => 'sometimes|required|string|max:255',
            'level' => 'sometimes|required|in:Nasional,Provinsi,Kabupaten/Kota,Sekolah',
            'rank' => 'nullable|string|max:50',
            'year' => 'sometimes|required|integer|min:2000|max:' . (date('Y') + 1),
            'date' => 'nullable|date',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->all();

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($achievement->image) {
                Storage::disk('public')->delete($achievement->image);
            }
            $imagePath = $request->file('image')->store('achievements', 'public');
            $data['image'] = $imagePath;
        }

        $achievement->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Achievement updated successfully',
            'data' => $achievement
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Achievement $achievement)
    {
        // Delete image if exists
        if ($achievement->image) {
            Storage::disk('public')->delete($achievement->image);
        }

        $achievement->delete();

        return response()->json([
            'success' => true,
            'message' => 'Achievement deleted successfully'
        ]);
    }
}
