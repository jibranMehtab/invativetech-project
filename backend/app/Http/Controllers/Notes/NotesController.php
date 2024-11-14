<?php

namespace App\Http\Controllers\Notes;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Notes;

class NotesController extends Controller
{
    // Fetch all notes
    public function index()
    {
        $notes = Notes::all();
        return response()->json([
            'status' => 200,
            'data' => $notes
        ]);
    }

    // Create a new note
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'content' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'error' => $validator->errors()
            ]);
        }

        $note = Notes::create([
            'title' => $request->title,
            'content' => $request->content,
        ]);

        return response()->json([
            'status' => 201,
            'message' => 'Note created successfully',
            'data' => $note
        ]);
    }

    // Retrieve a single note by ID
    public function show($id)
    {
        $note = Notes::find($id);

        if ($note) {
            return response()->json([
                'status' => 200,
                'data' => $note
            ]);
        }

        return response()->json([
            'status' => 404,
            'message' => 'Note not found'
        ]);
    }

    // Update a note
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'content' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'error' => $validator->errors()
            ]);
        }

        $note = Notes::find($id);

        if ($note) {
            $note->update([
                'title' => $request->title,
                'content' => $request->content,
            ]);

            return response()->json([
                'status' => 200,
                'message' => 'Note updated successfully',
                'data' => $note
            ]);
        }

        return response()->json([
            'status' => 404,
            'message' => 'Note not found'
        ]);
    }

    // Delete a note
    public function destroy($id)
    {
        $note = Notes::find($id);

        if ($note) {
            $note->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Note deleted successfully'
            ]);
        }

        return response()->json([
            'status' => 404,
            'message' => $id
        ]);
    }
}
