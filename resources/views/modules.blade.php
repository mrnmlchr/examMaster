<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>


	<form action="{{url('uploadModule')}}" method="post" enctype="multipart/form-data">

		@csrf

	<input type="text" name="name" placeholder="Product Name">

	<input type="text" name="description" placeholder="Product description">

	<input type="file" name="file">

	<input type="submit" >


	</form>

</body>
</html>
