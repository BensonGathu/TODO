<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Validator;
class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       return Item::orderBy('created_at', 'desc')->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            "title" => "required|min:3",
            "description" => "required"
        ]);

        if($validator->fails()) {
            return $this->validationErrors($validator->errors());
        }
        try {
        $newItem = new Item;
        $newItem->title = $request->title;
        $newItem->description = $request->description;
        $newItem->save();

        return $newItem;
        }
        catch(Exception $exception) {
            return response()->json(["status" => "failed", "error" => $exception->getMessage()], 404);

        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $existingItem = Item::find($id);  

        if($existingItem) {
            return response()->json(["status" => "success", "error" => false, "data" => $existingItem], 200);
        }
        return response()->json(["status" => "failed", "error" => true, "message" => "Failed! no todo found."], 404);
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, $id)
    {
        $existingItem = Item::find($id);  

        if($existingItem){

           $existingItem->completed = true;
           $existingItem->updated_at = Carbon::now() ;
           $existingItem->save();
           return $existingItem;

        } 
        return "Item not found";
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $existingItem = Item::find($id);  

        if($existingItem){
            $existingItem->title = $request->title; 
           $existingItem->description = $request->description; 
           
           $existingItem->updated_at = Carbon::now() ;
           $existingItem->save();
           return $existingItem;

        } 
        return "Item not found";
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $existingItem = Item::find($id);
        if($existingItem){
           $existingItem->delete();
           return "Item deleted";
    }
    return "Item not found";
    }
}