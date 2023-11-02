from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.shortcuts import render

def api_test(request):
    return JsonResponse({"message": "Hello from Django!"})


class LoginView(APIView):
    def post(self, request, format=None):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(username=email, password=password)

        if user is not None:
            return Response({'status': 'success', 'message': 'Logged in!'})
        else:
            return Response({'status': 'error', 'message': 'Invalid credentials.'})

def login_page(request):
    return render(request, "login.html")


