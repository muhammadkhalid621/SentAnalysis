from rest_framework import serializers
from .models import SearchWord

class SearchWordSerializer(serializers.ModelSerializer):
    class Meta:
        model = SearchWord
        fields = ('search_word', 'email', 'username')