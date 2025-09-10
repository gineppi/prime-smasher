<!DOCTYPE html>
<html lang="en">
<head>
    <style>
        canvas{
            margin:0 auto;
            display:block;
        }
        body{
            background-color: #222;
        }
        input{
            width: 300px;
            height:30px;

        }
        p{
            color:#fff;
        }
        div{
            display:flex;
            justify-content: center;
        }
    </style>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>素因数分解</title>
</head>
<body>
    <canvas id="canvas" width="1200" height="720"></canvas>
    <div>
        <p>ユーザー名</p>
        <input type="text" maxlength="16" id="name">
    </div>
    <script src="client.js"></script>
</body>
</html>
