"""
Views for registration app

register: Allows user to pick a username and password to create an account.
          Uses the default UserCreationForm from Django
"""
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken

from .serializers import RegisterSerializer, LoginSerializer
from userprofile.serializers import UserSerializer


class RegisterDetail(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

class LoginDetail(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })
