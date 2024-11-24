<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>


	<form action="<?php echo e(url('uploadModule')); ?>" method="post" enctype="multipart/form-data">

		<?php echo csrf_field(); ?>

	<input type="text" name="name" placeholder="Product Name">

	<input type="text" name="description" placeholder="Product description">

	<input type="file" name="file">

	<input type="submit" >


	</form>

</body>
</html>
<?php /**PATH C:\xampp\htdocs\ExamMaster\resources\views/modules.blade.php ENDPATH**/ ?>