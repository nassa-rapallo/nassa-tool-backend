export enum MAILING_TYPES {
  CREATE_USER = 'create-user',
  FORGOT_PASSWORD = 'forgot-password',
}

type ContentLink = { link: string };

export const mailingContent = <T extends ContentLink>(
  type: MAILING_TYPES,
  data: T,
): string => {
  switch (type) {
    case MAILING_TYPES.CREATE_USER:
      return createUserContent(data);
      break;

    case MAILING_TYPES.FORGOT_PASSWORD:
      return forgotPasswordContent(data);
      break;

    default:
      break;
  }
};

const createUserContent = (data: { link: string }): string => {
  return `<center>
            <b>Hi there, please confirm your email to use Smoothday.</b><br>
            Use the following link for this.<br>
            <a href="${data.link}"><b>Confirm The Email</b></a>
            </center>`;
};

const forgotPasswordContent = (data: { link: string }) => {
  return `<center>
            <b>Hi there, please confirm your email to use Smoothday.</b><br>
            Use the following link for this.<br>
            <a href="${data.link}"><b>Change Password</b></a>
            </center>`;
};
