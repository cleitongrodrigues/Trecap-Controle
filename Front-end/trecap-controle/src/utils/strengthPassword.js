let regex = new Array();
regex.push("[A-Z]"); //Uppercase Alphabet.
regex.push("[a-z]"); //Lowercase Alphabet.
regex.push("[0-9]"); //Digit.
regex.push("[$@$!%*#?&]"); //Special Character.

export default function strengthPasswordVerify(password) {
    let strengthPassword = 0
    let messagestrengthPassword = ''

    for (var i = 0; i < regex.length; i++) {
        if (password && new RegExp(regex[i]).test(password)) {
            strengthPassword++;
        }
    }

    switch (strengthPassword) {
        case 1:
          messagestrengthPassword = 'Fraca'
          break
        case 2:
          messagestrengthPassword = 'Médio'
          break
        case 3:
          messagestrengthPassword = 'Forte'
          break
        case 4:
          messagestrengthPassword = 'Muito Forte'
          break
        default:
          messagestrengthPassword = ''
          break
    }

    return {
        strengthPassword,
        messagestrengthPassword
    }
}

