from rest_framework import serializers
from .models import TwitterSNA, TwitterProfiling, FbSNA, FbProfiling, TwitterLogging, FbLogging

class TwitterSNASerializer(serializers.ModelSerializer):
    # retrieved_time = serializers.SerializerMethodField()
    
    class Meta:
        model = TwitterSNA
        fields = ('File','email','username')

class TwitterProfilingSerializer(serializers.ModelSerializer):
    # retrieved_time = serializers.SerializerMethodField()
    
    class Meta:
        model = TwitterProfiling
        fields = ('File','email','username')

class FbSNASerializer(serializers.ModelSerializer):
    # retrieved_time = serializers.SerializerMethodField()
    
    class Meta:
        model = FbSNA
        fields = ('File','email','username')

class FbProfilingSerializer(serializers.ModelSerializer):
    # retrieved_time = serializers.SerializerMethodField()
    
    class Meta:
        model = FbProfiling
        fields = ('File','email','username')

class TwitterLogSerializer(serializers.ModelSerializer):
    # retrieved_time = serializers.SerializerMethodField()
    
    class Meta:
        model = TwitterLogging
        fields = ('File','email','username')

class FbLogSerializer(serializers.ModelSerializer):
    # retrieved_time = serializers.SerializerMethodField()
    
    class Meta:
        model = FbLogging
        fields = ('File','email','username')

