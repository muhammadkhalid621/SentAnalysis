from rest_framework import serializers
from .models import FileUpload

class FileUploadSerializer(serializers.ModelSerializer):
    # retrieved_time = serializers.SerializerMethodField()
    
    class Meta:
        model = FileUpload
        fields = ('File','option','email','username')