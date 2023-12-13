function getUserName(email: string | undefined) {
  if(email)
 {
  const index = [...email].findIndex(element => element === '@');
  return email.slice(0, index);
 }
}

export default getUserName;