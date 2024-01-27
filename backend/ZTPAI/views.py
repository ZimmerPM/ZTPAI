from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response


def api_test(request):
    return JsonResponse({"message": "Hello from Django!"})




