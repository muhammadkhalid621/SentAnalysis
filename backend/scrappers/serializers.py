from rest_framework import serializers
from .models import Twitter_Scrapper, Twitter_Scrapper_Location, Fb_scrapper_pages, Fb_scrapper_post, Fb_scrapper_comments, Fb_scrapper_groups


class TwitterScrapperSerializer(serializers.ModelSerializer):
    class Meta:
        model = Twitter_Scrapper
        fields = ('search_id', 'search_word', 'tweetCount',
                  'start', 'end', 'email', 'username')

class TwitterScrapperLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Twitter_Scrapper_Location
        fields = ('search_id', 'search_word', 'tweetCount',
                  'start', 'end', 'location', 'radius', 'email', 'username')


class FBSerializer_pages(serializers.ModelSerializer):
    class Meta:
        model = Fb_scrapper_pages
        fields = ('search_id', 'page_name',
                  'PostCount_page', 'email', 'username')


class FBSerializer_post(serializers.ModelSerializer):
    class Meta:
        model = Fb_scrapper_post
        fields = ('search_id', 'url_post',
                  'email', 'username')


class FBSerializer_comments(serializers.ModelSerializer):
    class Meta:
        model = Fb_scrapper_comments
        fields = ('search_id',
                  'url_comments', 'email', 'username')


class FBSerializer_groups(serializers.ModelSerializer):
    class Meta:
        model = Fb_scrapper_groups
        fields = ('search_id',  'group_name',
                  'PostCount_group', 'email', 'username')
