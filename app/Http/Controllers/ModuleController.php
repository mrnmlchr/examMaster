<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;


use App\Models\Module;




class ModuleController extends Controller
{
   public function index()
   {
   	
        return Module::all();

   }

   // Add this method in your ModuleController
   public function search(Request $request)
   {
       $query = $request->get('query'); // Get the search query
   
       // Fetch modules where the name matches exactly
       $modules = DB::table('modules')
           ->where('name', $query)
           ->get();
   
       return response()->json($modules); // Return the matching modules
   }
   



    public function modules()
   {
   	
   	return view('modules');

   }

     public function store(Request $request)
   {

   		$data=new Module();
   	
   	  
			$file=$request->file;
		        
	$filename=time().'.'.$file->getClientOriginalExtension();

		        $request->file->move('assets',$filename);

		        $data->file=$filename;


		        $data->name=$request->name;
		        $data->description=$request->description;

		        $data->save();
		        return redirect()->back();



   }


   public function show()
   {

   	$data=Module::all();
   	return view('showmodules',compact('data'));
   }


      public function download(Request $request,$file)
   {

   	
return response()->download(public_path('assets/'.$file));
   }



   public function view($id)
   {
   	$data=Module::find($id);

   	return view('viewmodules',compact('data'));


   }

   public function getModules()
    {
        $data = Module::all(); // Fetch all modules
        return response()->json($data);
    }

    public function delete($id)
    {
        // Find the module by ID
        $module = DB::table('modules')->where('id', $id)->first();
    
        if (!$module) {
            return response()->json(['message' => 'Module not found'], 404);
        }
    
        // Move the module to the deleted_modules table
        DB::table('deleted_modules')->insert([
            'id' => $module->id,
            'name' => $module->name,
            'description' => $module->description,
            'file' => $module->file,
            'created_at' => $module->created_at,
            'updated_at' => $module->updated_at,
            'deleted_at' => now(), // Add a timestamp for when the module was "deleted"
        ]);
    
        // Delete the module from the modules table
        DB::table('modules')->where('id', $id)->delete();
    
        return response()->json(['message' => 'Module deleted successfully'], 200);
    }


    


 
}