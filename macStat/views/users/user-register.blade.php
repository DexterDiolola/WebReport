<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Register</title>
	<link rel="shortcut icon"  href="{{asset('/images/wizherLogo.png')}}" >
	<link rel="stylesheet" type="text/css" href="{{asset('/css/bootstrap.min.css')}}">
	<link rel="stylesheet" type="text/css" href="{{asset('/css/authStyle.css')}}">
</head>
<body>
	<div class="col-sm-3 form-frame">
		<div class="col-sm-12">
			@if (count($errors)>0)
				@foreach ($errors->all() as $error)
					<p class="alert alert-danger">{{$error}}</p>
				@endforeach
			@endif
			<form  method="post">
			  {{csrf_field()}}
			  <fieldset>
			    <legend><b>Register</b></legend>
			    <div class="form-group">
			      <label >Username</label>
			      <input type="text" class="form-control" name="username" value="{{old('username')}}" placeholder="Enter username">
			    </div>
			    <div class="form-group">
			      <label>Email address</label>
			      <input type="text" class="form-control" name="email" value="{{old('email')}}" placeholder="Enter email">
			    </div>
			    <div class="form-group">
			      <label>Password</label>
			      <input type="password" class="form-control" name="password" placeholder="Password">
			    </div>
			    <div class="form-group">
			      <label>Confirm Password</label>
			      <input type="password" class="form-control" name="password_confirmation" placeholder="Password">
			    </div>
			    
			    <button type="submit" class="btn btn-primary col-sm-12">Register</button>
			    <button type="button" class="btn btn-primary col-sm-12 login"><a href="login">Login</a></button>
			  </fieldset>
			</form>
		</div>
	</div>
	
	<script src="https://npmcdn.com/tether@1.2.4/dist/js/tether.min.js"></script> <!--to remove "Bootstrap Needs Tether" error-->
	<script type="text/javascript" src="{{asset('/js/lib/jquery.js')}}"></script>
	<script type="text/javascript" src="{{asset('/js/lib/bootstrap.js')}}"></script>
</body>

</html>
