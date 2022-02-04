from djoser.serializers import UserCreateSerializer as BaseUserRegistrationSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import userProfile

User = get_user_model()

class UserCreateSerializer(BaseUserRegistrationSerializer):
    isAdmin = serializers.SerializerMethodField(read_only=True)
    class Meta(BaseUserRegistrationSerializer.Meta):
        model = User
        fields = ('user_id', 'email', 'username', 'number', 'password', 'gender' , 'dob', 'isAdmin','image')

    def get_isAdmin(self, obj):
        return obj.is_staff

class userProfileSerializer(serializers.ModelSerializer):
    user=serializers.StringRelatedField(read_only=True)
    class Meta:
        model=userProfile
        fields='__all__'
