const hOffset = document.getElementById('hOffset'), vOffset = document.getElementById('vOffset'), blurRadius = document.getElementById('blurRadius'), 
    spread = document.getElementById('spread'), opacity = document.getElementById('opacity'), borderRadius = document.getElementById('border')
const hOffsetValue = document.getElementById('hRange'), bRadiusValue = document.getElementById('blurRange'), 
    opValue = document.getElementById('opaRange'), vOffsetValue = document.getElementById('vRange'), 
    spRadiusValue = document.getElementById('spreadRange'), borderValue = document.getElementById('radiusRange')

window.onload = () => {
    resetRangeValues()  
    generateOrUpdateBoxShadow()
}

/* Resetea los valores de los rangos */
const resetRangeValues = () => {
    hOffsetValue.value = '5', hOffset.value = 5, vOffsetValue.value = '5', vOffset.value = 5
    bRadiusValue.value = '0', blurRadius.value = 0, spRadiusValue.value = '0', spread.value = 0, borderValue.value = '0', borderRadius.value = 0
    opValue.value = '0.75', opacity.value = 0.75      
}
const boxShadowOptions = document.querySelectorAll('.shadow-options input')
/* Se llama a la función cada que cambia el rango de alguna opción */
boxShadowOptions.forEach((range) => {
    range.addEventListener('input', generateOrUpdateBoxShadow)
});

/* Transforma el color hexadecimal al modelo RGB */
const hexColorToRgba = (colorShw, opacityShw) => {
    const r = parseInt(colorShw.substr(1, 2), 16)
    const g = parseInt(colorShw.substr(3, 2), 16)
    const b = parseInt(colorShw.substr(5, 2), 16)
    return `rgba(${r}, ${g}, ${b}, ${opacityShw})`
}

const generatedBoxShadow = document.querySelector('.box-shadow-preview'), boxShadowCode = document.getElementById('bs-code')
/* Genera la vista previa y el código de box-shadow */
function generateOrUpdateBoxShadow() {
    const colorShadow = document.getElementById('color').value, insetShadow = document.getElementById('inset').checked
    /* Se crea la estructura del código */
    const code = `${insetShadow ? 'inset ' : ''} ${hOffset.value}px ${vOffset.value}px ${blurRadius.value}px ${spread.value}px ${hexColorToRgba(colorShadow, opacity.value)}`
    /* Se le asignan los estilos a la figura de vista previa y se inserta el código en el área de texto */
    generatedBoxShadow.style.boxShadow = code
    generatedBoxShadow.style.borderRadius = `${borderRadius.value}px`
    boxShadowCode.textContent = `-webkit-box-shadow: ${code}; \n-moz-box-shadow: ${code}; \nbox-shadow: ${code};\nborder-radius: ${borderRadius.value}px;`
}
generateOrUpdateBoxShadow()

/* Copia todas las lineas de código */
const copyCodeBtn = document.querySelector('.copy-btn')
copyCodeBtn.addEventListener('click', () => {
    boxShadowCode.select()
    boxShadowCode.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(boxShadowCode.value)
})