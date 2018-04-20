<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Sign-in</title>
	<link rel="shortcut icon"  href="{{asset('/images/wizherLogo.png')}}" >
	<link rel="stylesheet" type="text/css" href="{{asset('/css/bootstrap.min.css')}}">
	<link rel="stylesheet" type="text/css" href="{{asset('/css/authStyle.css')}}">
</head>
<body>
	<div class=" col-sm-3 form-frame">
		<div class="col-sm-12">
			@if (count($errors)>0)
				@foreach ($errors->all() as $error)
					<p class="alert alert-danger">{{$error}}</p>
				@endforeach
			@endif
			<!---<div class="col-sm-8 imgLogo">
				<img src="{{asset('/images/wizher.png')}}" style="height:40; width:130; margin:5 0 0 0;">
			</div> -->
			
			<form action="/admin/login" method="post">
			  {{csrf_field()}}
			  <fieldset>
			    <legend><b>Admin Sign-in</b></legend>
			    <div class="form-group">
			      <label >Username</label>
			      <input type="text" class="form-control" name="username" value="{{old('username')}}" placeholder="Enter username">
			    </div>
			    
			    <div class="form-group">
			      <label>Password</label>
			      <input type="password" class="form-control" name="password" placeholder="Password">
			    </div>

			    <!---<div class="form-group col-sm-6 forgot">
			    	<a href="#">Forgot Password?</a>
			    </div> -->
			   
			    <button type="submit" class="btn btn-primary col-sm-12">Login</button>
			    
			    <div class="form-group register col-sm-10">
			    	<a href="register">Don't have an account? Register</a>
			    </div>
			  </fieldset>
			</form>
		</div>
	</div>
	
	<script src="https://npmcdn.com/tether@1.2.4/dist/js/tether.min.js"></script> <!--to remove "Bootstrap Needs Tether" error-->
	<script type="text/javascript" src="{{asset('/js/lib/jquery.js')}}"></script>
	<script type="text/javascript" src="{{asset('/js/lib/bootstrap.js')}}"></script>
</body>

</html>
