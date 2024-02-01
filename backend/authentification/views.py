from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from django.contrib.auth import authenticate
from django.shortcuts import render
from .serializers import UserSerializer, UserRegistrationSerializer
from rest_framework.decorators import api_view, permission_classes
from drf_yasg.utils import swagger_auto_schema
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.hashers import check_password


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    user = request.user
    user_data = UserSerializer(user).data
    return Response(user_data)

class HomeView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        content = {'message': 'Welcome to the JWT Authentication page using React Js and Django!'}

        return Response(content)


class LoginView(APIView):
    def post(self, request, format=None):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(username=email, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            user_data = UserSerializer(user).data  # Użyj serializera, aby pobrać dane użytkownika
            return Response({
                'status': 'success',
                'message': 'Logged in!',
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': user_data  # Dodaj serializowane dane użytkownika do odpowiedzi
            })
        else:
            return Response({
                'status': 'error',
                'message': 'Invalid credentials.'
            }, status=status.HTTP_401_UNAUTHORIZED)
def login_page(request):
    return render(request, "login.html")


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):

        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class RegisterView(APIView):
    @swagger_auto_schema(request_body=UserRegistrationSerializer)
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            # Możemy teraz użyć serializer.validated_data, ponieważ pola są już zweryfikowane
            user = User.objects.create_user(
                username=serializer.validated_data['email'],  # Tutaj używamy e-maila jako nazwy użytkownika
                email=serializer.validated_data['email'],
                password=serializer.validated_data['password'],
                first_name=serializer.validated_data.get('first_name', ''),
                last_name=serializer.validated_data.get('last_name', '')
            )
            return Response({'status': 'success', 'message': 'User created successfully.'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ChangePasswordView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        user = request.user
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')

        if not user.check_password(old_password):
            return Response({'detail': 'Nieprawidłowe aktualne hasło.'}, status=status.HTTP_400_BAD_REQUEST)


        user.set_password(new_password)
        user.save()
        update_session_auth_hash(request, user)

        return Response({'detail': 'Hasło zostało pomyślnie zmienione.'}, status=status.HTTP_200_OK)