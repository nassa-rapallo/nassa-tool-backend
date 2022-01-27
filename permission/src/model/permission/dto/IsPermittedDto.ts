export class IsPermittedDto {
  // id
  action: string;

  // role for the section and global role
  roles: {
    section?: string;
    global?: string;
  };
}
