const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePhone = (phone: string) => {
    const phonePattern = /^\(\d{2}\) \d{5}-\d{4}$/;
    return phonePattern.test(phone);
  };

  const validatePassword = (password: string) => {
    return /[A-Z]/.test(password);
  };

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{0,4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return value;
  };

  export { validateEmail, validatePhone, validatePassword, formatPhone };