// src/utils/sendEmail.ts

import * as nodemailer from 'nodemailer';

// Função para enviar e-mail
export const sendVerificationEmail = async (recipient: string, code: string) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email', // Ou o SMTP que você está usando
        port: 587, // Porta do servidor SMTP
        secure: false, // true para 465, false para outras portas
        auth: {
            user: 'maddison53@ethereal.email', // Nome de usuário SMTP
            pass: 'jn7jnAPss4f63QBp6D', // Senha SMTP
        },
    });

    const mailOptions = {
        from: 'not_resp@veriflogin.com', // Remetente anônimo
        to: recipient,
        subject: 'Seu código de verificação',
        text: `Seu código de verificação é: ${code}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('E-mail enviado com sucesso!');
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
    }
};

