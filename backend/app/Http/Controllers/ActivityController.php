<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ActivityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Activity::query();

        if ($request->has('category') && $request->category !== 'Semua') {
            $query->where('category', $request->category);
        }

        if ($request->has('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        $activities = $query->orderBy('date', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $activities
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'required|in:Lomba,Kegiatan Jurusan,Kunjungan Industri,Kegiatan Sekolah',
            'date' => 'required|date',
            'location' => 'nullable|string|max:255',
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

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('activities', 'public');
            $data['image'] = $imagePath;
        }

        $activity = Activity::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Activity created successfully',
            'data' => $activity
        ], 201);
    }

    
    public function show(Activity $activity)
    {
        return response()->json([
            'success' => true,
            'data' => $activity
        ]);
    }



    public function update(Request $request, Activity $activity)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'sometimes|required|in:Lomba,Kegiatan Jurusan,Kunjungan Industri,Kegiatan Sekolah',
            'date' => 'sometimes|required|date',
            'location' => 'nullable|string|max:255',
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

        if ($request->hasFile('image')) {
     
            if ($activity->image) {
                Storage::disk('public')->delete($activity->image);
            }
            $imagePath = $request->file('image')->store('activities', 'public');
            $data['image'] = $imagePath;
        }

        $activity->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Activity updated successfully',
            'data' => $activity
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Activity $activity)
    {
        if ($activity->image) {
            Storage::disk('public')->delete($activity->image);
        }

        $activity->delete();

        return response()->json([
            'success' => true,
            'message' => 'Activity deleted successfully'
        ]);
    }
}
