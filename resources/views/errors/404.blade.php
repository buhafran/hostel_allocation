@extends('errors.minimal')

@section('title', __('Not Found'))
@section('code', '404')
@section('message')
 {{__('Not Found')}}
 <br>
 <a href="{{url()->previous()}}">Go Back</a>
@endsection
