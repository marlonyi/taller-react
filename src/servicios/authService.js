export async function login(username, password) {
    try {
      const response = await fetch('https://carros-electricos.wiremockapi.cloud/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) return null;
  
      const data = await response.json();
      return data.token;
    } catch (error) {
      console.error('Error al autenticar:', error);
      return null;
    }
  }
  