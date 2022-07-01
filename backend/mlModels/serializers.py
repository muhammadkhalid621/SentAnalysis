from rest_framework import serializers
from .models import TwitterModel, FbModel, Train, ModeleTrainingFiles, twitterModel_Client, FbModel_Client

class TwitterModelSerializer(serializers.ModelSerializer):
    # retrieved_time = serializers.SerializerMethodField()
    
    class Meta:
        model = TwitterModel
        fields = ('File','option','email','username')

class FbModelSerializer(serializers.ModelSerializer):
    # retrieved_time = serializers.SerializerMethodField()
    
    class Meta:
        model = FbModel
        fields = ('File','email','username')

class TwitterModelClientSerializer(serializers.ModelSerializer):
    # retrieved_time = serializers.SerializerMethodField()
    
    class Meta:
        model = twitterModel_Client
        fields = ('File','email','username')

class FbModelClientSerializer(serializers.ModelSerializer):
    # retrieved_time = serializers.SerializerMethodField()
    
    class Meta:
        model = FbModel_Client
        fields = ('File','email','username')

class TrainModelSerializer(serializers.ModelSerializer):
    # retrieved_time = serializers.SerializerMethodField()
    
    class Meta:
        model = Train
        fields = ('File','email','username')

class ModelTainingFileSerializer(serializers.ModelSerializer):
    # retrieved_time = serializers.SerializerMethodField()
    
    class Meta:
        model = ModeleTrainingFiles
        fields = ('weight_sarcasm', 'weight_sentiment', 'sarcasm_Model', 'sentiment_Model')