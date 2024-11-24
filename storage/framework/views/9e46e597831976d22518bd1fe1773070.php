<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Module Details</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f7f7f7;
            margin: 0;
            padding: 0;
            height: 100vh; /* Make the body take full height of the viewport */
        }

        .container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
        }


        .iframe-container {
            text-align: center;
            width: 100%;
            height: 100%;
            position: relative;
            overflow: hidden;
        }

        iframe {
            width: 100%;
            height: 100%;
            border: none;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .back-button {
            display: block;
            width: 200px;
            padding: 10px;
            text-align: center;
            background-color: #007BFF;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px auto;
            font-size: 1.2em;
        }

        .back-button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>

        <div class="iframe-container">
            <!-- Iframe to display the document -->
            <iframe src="/assets/<?php echo e($data->file); ?>" allowfullscreen></iframe>
        </div>

        <a href="/module" class="back-button">Back to Modules</a>
    </div>

</body>
</html>
<?php /**PATH C:\xampp\htdocs\ExamMaster\resources\views/viewmodules.blade.php ENDPATH**/ ?>