const hOffset = document.getElementById('hOffset'), vOffset = document.getElementById('vOffset'), blurRadius = document.getElementById('blurRadius'), 
    spread = document.getElementById('spread'), opacity = document.getElementById('opacity'), borderRadius = document.getElementById('border')
const hOffsetValue = document.getElementById('hRange'), opValue = document.getElementById('opaRange'), vOffsetValue = document.getElementById('vRange'), 
    borderValue = document.getElementById('radiusRange')
const colorShadow = document.getElementById('color'), insetShadow = document.getElementById('inset')
const generatedBoxShadow = document.querySelector('.box-shadow-preview'), boxShadowCode = document.getElementById('bs-code'),
    boxShadowOptions = document.querySelectorAll('.shadow-options input')

window.onload = () => {
    resetRangeValues()  
    generateOrUpdateBoxShadow()
}

/* Se llama a la función cada que el valor de los input tipo 'range' y el checkbox cambian */
boxShadowOptions.forEach((range) => {
    range.addEventListener('input', generateOrUpdateBoxShadow)
});
insetShadow.addEventListener('change', () => { generateOrUpdateBoxShadow() })
colorShadow.addEventListener('change', () => { generateOrUpdateBoxShadow() })

/* Genera la vista previa y el código de box-shadow */
function generateOrUpdateBoxShadow() {
    const code = `${insetShadow.checked ? 'inset ' : ''} ${hOffset.value}px ${vOffset.value}px ${blurRadius.value}px ${spread.value}px ${hexColorToRgba(colorShadow.value, opacity.value)}`
    generatedBoxShadow.style.boxShadow = code
    generatedBoxShadow.style.borderRadius = `${borderRadius.value}%`
    boxShadowCode.textContent = `box-shadow: ${code};\n-webkit-box-shadow: ${code};\n-moz-box-shadow: ${code};\nborder-radius: ${borderRadius.value}%;`
}

/* Transforma el color hexadecimal al modelo RGB */
const hexColorToRgba = (colorShw, opacityShw) => {
    const r = parseInt(colorShw.substr(1, 2), 16), g = parseInt(colorShw.substr(3, 2), 16), b = parseInt(colorShw.substr(5, 2), 16)
    return `rgba(${r}, ${g}, ${b}, ${opacityShw})`
}

const copyCodeBtn = document.querySelector('.copy-btn')
copyCodeBtn.addEventListener('click', () => {
    boxShadowCode.select()
    boxShadowCode.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(boxShadowCode.value)
})

/* Resetea los valores de los rangos */
const resetRangeValues = () => {
    boxShadowOptions.forEach(element => { element.value = 0 });
    hOffsetValue.value = hOffset.value = vOffsetValue.value = vOffset.value = borderRadius.value = borderValue.value = 5
    opValue.value = opacity.value = 0.75     
    insetShadow.checked = false
}