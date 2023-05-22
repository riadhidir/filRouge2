import generator from "generate-password";



export const generate = ()=>{
    let password = generator.generate({
        length: 15,
        numbers: true,
        symbols: true
    });
    return password;
}
export default generate;