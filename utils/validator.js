export const validarCpf = (cpf) => {
    if (!cpf) {
        return false;
    }

    if (cpf.length === 11) {
        return true;
    }
    return false;
};