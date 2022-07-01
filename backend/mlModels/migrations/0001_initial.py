# Generated by Django 4.0.4 on 2022-06-04 14:18

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='FbModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('File', models.FileField(upload_to='dataset/fb_model')),
                ('code', models.CharField(max_length=15)),
                ('email', models.EmailField(max_length=254)),
                ('username', models.CharField(max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='FbModel_Client',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('File', models.FileField(upload_to='predict_dataset')),
                ('code', models.CharField(max_length=15)),
                ('email', models.EmailField(max_length=254)),
                ('username', models.CharField(max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='ModeleTrainingFiles',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('weight_sarcasm', models.FileField(blank=True, max_length=255, null=True, upload_to='')),
                ('weight_sentiment', models.FileField(blank=True, max_length=255, null=True, upload_to='')),
                ('sarcasm_Model', models.FileField(blank=True, max_length=255, null=True, upload_to='')),
                ('sentiment_Model', models.FileField(blank=True, max_length=255, null=True, upload_to='')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Train',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('File', models.FileField(upload_to='dataset/train')),
                ('email', models.EmailField(max_length=254)),
                ('username', models.CharField(max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='TwitterModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('File', models.FileField(upload_to='dataset/twitter_model')),
                ('code', models.CharField(max_length=15)),
                ('option', models.CharField(choices=[('Prediction', 'Run Predictions'), ('Report', 'Generate Report'), ('Both', 'Run Predictions & Generate Report')], max_length=50)),
                ('email', models.EmailField(max_length=254)),
                ('username', models.CharField(max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='twitterModel_Client',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('File', models.FileField(upload_to='predict_dataset')),
                ('code', models.CharField(max_length=15)),
                ('email', models.EmailField(max_length=254)),
                ('username', models.CharField(max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
