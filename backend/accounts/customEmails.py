from djoser import email
from djoser import utils
from djoser.conf import settings
from django.contrib.auth.tokens import default_token_generator
# from sentAnalysis import settings

class ActivationEmail(email.ActivationEmail):
    template_name = 'email/emailactivation.html'

    def get_context_data(self):
        # PasswordResetEmail can be deleted
        context = super().get_context_data()

        user = context.get("user")
        context["uid"] = utils.encode_uid(user.pk)
        context["token"] = default_token_generator.make_token(user)
        context["url"] = settings.ACTIVATION_URL.format(**context)
        return context

class ConfirmationEmail(email.ConfirmationEmail):
    template_name = "email/activationconfirm.html"


class PasswordResetEmail(email.PasswordResetEmail):
    template_name = "email/passwordchange.html"

    def get_context_data(self):
        # PasswordResetEmail can be deleted
        context = super().get_context_data()

        user = context.get("user")
        context["uid"] = utils.encode_uid(user.pk)
        context["token"] = default_token_generator.make_token(user)
        context["url"] = settings.PASSWORD_RESET_CONFIRM_URL.format(**context)
        return context


class PasswordChangedConfirmationEmail(email.PasswordChangedConfirmationEmail):
    template_name = "email/passwordconfirm.html"
