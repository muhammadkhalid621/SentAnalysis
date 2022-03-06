from django.db import models
import uuid
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.core.exceptions import ValidationError
from django.conf import settings
from datetime import date

class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, password=None, **kwargs):
        user = self.model(
            email=email,
            is_staff=True,
            is_superuser=True,
            is_active=True,
            **kwargs
        )
        user.set_password(password)
        user.save()
        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    def validateNumber(value):
        if value != 11:
            raise ValidationError ( 'Invalid Number')

    gender = [
        ('Male', 'Male'), 
        ('Female', 'Female'), 
        ('Other', 'Other')]
    user_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(verbose_name="email", max_length=255, unique=True)
    username = models.CharField(max_length=50, unique=True)
    number = models.BigIntegerField(unique=True)
    gender = models.CharField(max_length=50, choices=gender)
    dob = models.DateField(default=date.today, editable=True)
    image = models.ImageField()
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'gender','number', 'image']

    
    
    def __str__(self):
        return self.email

class userProfile(models.Model):
    gender = [
        ('Male', 'Male'), 
        ('Female', 'Female'), 
        ('Other', 'Other')]
    User = settings.AUTH_USER_MODEL
    user=models.OneToOneField(User,on_delete=models.CASCADE,related_name="profile")
    email = models.EmailField(verbose_name="email", max_length=255, unique=True)
    username = models.CharField(max_length=50, unique=True)
    number = models.BigIntegerField(unique=True)
    gender = models.CharField(max_length=50, choices=gender)
    dob = models.DateField(auto_now_add=True)
    image = models.ImageField()
    is_staff = models.BooleanField(default=False)
    updated_on=models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.username