var img = new Image()
var context, prop = wid = 0, isMoving =false, widths, heights, color, hasMask = false, hei, widCut, heiCut, wid0, hei0, initWid = initHei = 0, wheelValue = 0
var dialogNewImageHTML = "<h1>Inserir nova Imagem</h1> <input name='image' type='url' id='insertFile2' accept='.jpg, .png, .jpeg' placeholder='Inserir URL Imagem' required> <button class='btnImage' type='submit' onclick=\"submitImg('insertFile2')\">Carregar</button>"
var dialogDownloadHTML = "<h1>Escolha o tamanho da imagem:</h1> <div> <label for='orig' id='sizeOrig'>¬</label> <label for='prog' id='sizeProg'>(965x540)</label> </div> <div> <a id='downloadOriginal' name='orig' download>Original</a> <a id='downloadTela' name='prog' download>Tela Programa <b>Recomendado</b></a> </div>"
var context2, colorPaint='rgb(0,0,0)' , sizePaint = 5, oldSize, txtInp, txtX, txtY, txtX2, txtY2, isTexting = false, colorText='rgb(0,0,0)', sizeText = 18, fontStyle;

function draw(){
    var canvas = /** @type {HTMLCanvasElement} */ (document.querySelector('#mainImg'))
    context = canvas.getContext('2d');
}

function drawImg(image){
    document.getElementById('inserts').innerHTML = " ";
    img.src = image
}

function printImg(){
    var con = document.getElementById('mainImg')
    con.width = 965
    con.height = 540
}

function submitImg(inpt_){
    var inpt = document.getElementById(inpt_);
    printImg();
    drawImg(inpt.value);
}

function openDialog(type){
    var control = true
    var dia = document.getElementById('dialog');
    switch (type) {
        case 'newImage':            
            if (dia.classList.contains('downloadImageDialog')){
                dia.classList.remove('downloadImageDialog')
                control = false
            }
            dia.classList.toggle('newImage');
            if(document.getElementsByClassName('dialogNewImage')[0].innerHTML=='V'){
                dia.innerHTML = dialogNewImageHTML
                document.getElementsByClassName('dialogNewImage')[0].innerHTML='Ʌ'
            }else{
                document.getElementsByClassName('dialogNewImage')[0].innerHTML='V'
            }
            break;
        case 'downloadImg':
            if(dialogDownloadHTML.indexOf('¬') >=0){
                oldSize = '(' + initWid+'X'+initHei + ')'
                dialogDownloadHTML = dialogDownloadHTML.replace('¬','(' + initWid+'X'+initHei + ')')
            }else{
                dialogDownloadHTML = dialogDownloadHTML.replace(oldSize,'(' + initWid+'X'+initHei + ')')
            }
            if (dia.classList.contains('newImage')){
                dia.classList.remove('newImage')
                control = false
            }
            dia.classList.toggle('downloadImageDialog');
            dia.innerHTML = dialogDownloadHTML;
            if(! document.getElementById('mainImg').classList.contains('tgPaint')){
                adapt_size()    
            }
            break;
        default:
            break;
    }
    if(control){
        if (dia.getAttribute('open') === '')
            dia.removeAttribute('open') 
        else
            dia.setAttribute('open','')
    }

}

var filters = ' grayscale(0%) blur(0px) brightness(100%) contrast(100%) hue-rotate(0deg) opacity(100%) saturate(100%) invert(0%) sepia(0%) drop-shadow(0px 0px 0px transparent)'
function modifyImg(type){
    var img = document.getElementById('mainImg')
    var name = type.name 
    var v = type.value
    switch (name) {
        case 'sat':
            var replacing = filters.slice(filters.indexOf('grayscale'),filters.indexOf('blur'))
            filters = filters.replace(replacing,'grayscale('+v+'%) ')
            break;
        case 'brig':
            var replacing = filters.slice(filters.indexOf('brightness'),filters.indexOf('contrast'))
            filters = filters.replace(replacing,'brightness('+v+'%) ')
            break;
        case 'cont':
            var replacing = filters.slice(filters.indexOf('contrast'),filters.indexOf('hue-rotate'))
            filters = filters.replace(replacing,'contrast('+v+'%) ')
            break;
        case 'hue':
            var replacing = filters.slice(filters.indexOf('hue-rotate'),filters.indexOf('opacity'))
            filters = filters.replace(replacing,'hue-rotate('+v+'deg) ')
            break;
        case 'opa':
            var replacing = filters.slice(filters.indexOf('opacity'),filters.indexOf('saturate'))
            filters = filters.replace(replacing,'opacity('+v+'%) ')
            break;
        case 'inv':
            type.classList.toggle('inv')
            if (type.classList.contains('inv'))
                v = 100
            else    
                v = 0
            var replacing = filters.slice(filters.indexOf('invert'),filters.indexOf('sepia'))
            filters = filters.replace(replacing,'invert('+v+'%) ')
            break;
        case 'sep':
            type.classList.toggle('inv')
            if (type.classList.contains('inv'))
                v = 100
            else    
                v = 0
            var replacing = filters.slice(filters.indexOf('sepia'),filters.indexOf('drop-shadow'))
            filters = filters.replace(replacing,'sepia('+v+'%) ')
            break;
        case 'cyber':
            type.classList.toggle('inv')
            var v2 = v3 = v4 = v5 = 0
            if (type.classList.contains('inv')){
                v = 20 //invert
                v2 = 310 //hue
                v3 = 150 //contraste
                v4 = 130 //brilho
                v5 = 30 //saturação 
            }else{    
                v = 0
                v2 = 0
                v3 = 100
                v4 = 100
                v5 = 0
            }
            var replacing = filters.slice(filters.indexOf('invert'),filters.indexOf('sepia'))
            filters = filters.replace(replacing,'invert('+v+'%) ')
            replacing = filters.slice(filters.indexOf('hue-rotate'),filters.indexOf('opacity'))
            filters = filters.replace(replacing,'hue-rotate('+v2+'deg) ')
            replacing = filters.slice(filters.indexOf('contrast'),filters.indexOf('hue-rotate'))
            filters = filters.replace(replacing,'contrast('+v3+'%) ')
            replacing = filters.slice(filters.indexOf('brightness'),filters.indexOf('contrast'))
            filters = filters.replace(replacing,'brightness('+v4+'%) ')
            replacing = filters.slice(filters.indexOf('grayscale'),filters.indexOf('blur'))
            filters = filters.replace(replacing,'grayscale('+v5+'%) ')
            break;
        case 'pb':
            type.classList.toggle('inv')
            var v3 = v4 = v5 = 0
            if (type.classList.contains('inv')){
                v3 = 250 //contraste
                v4 = 150 //brilho
                v5 = 100 //saturação 
            }else{    
                v3 = 100
                v4 = 100
                v5 = 0
            }
            var replacing = filters.slice(filters.indexOf('contrast'),filters.indexOf('hue-rotate'))
            filters = filters.replace(replacing,'contrast('+v3+'%) ')
            replacing = filters.slice(filters.indexOf('brightness'),filters.indexOf('contrast'))
            filters = filters.replace(replacing,'brightness('+v4+'%) ')
            replacing = filters.slice(filters.indexOf('grayscale'),filters.indexOf('blur'))
            filters = filters.replace(replacing,'grayscale('+v5+'%) ')
            break;
        default:
            break;
    }
    var con = document.getElementById('mainImg');
    context.clearRect(0,0,con.width,con.height)  
}

function updateCanvas(){
    var con = document.getElementById('mainImg')    
    context.clearRect(0,0,con.width,con.height);
    context.filter=filters;
    context.drawImage(img, widths,heights,wid,hei);   
    if(hasMask){
        maskImg(1)
    }else{
        context.globalAlpha = 1;
    }
    if (!isTexting && document.getElementById('downImg').height > 0){
        context.font = sizeText+"px " + fontStyle
        context.fillStyle = colorText
        context.fillText(txtInp,txtX,txtY);
        context2.fillText(txtInp,txtX2,txtY2);
    }
}

function activeFunction(elem){
    elem.classList.toggle('tgFunction')
    if (elem.id == "move"){
        document.getElementById('mainImg').classList.toggle("tgMove");
        context.drawImage(img, widths,heights,wid,hei);  
        if (document.getElementById('mainImg').classList.contains('tgMove')){
            document.getElementById('paint').hidden = true;
            document.getElementById('text').hidden = true;
        }else if(! document.getElementById('mainImg').classList.contains('tgMove')){
            document.getElementById('paint').hidden = false;
            document.getElementById('text').hidden = false;
        }
    }
    if (elem.id == "paint"){
        document.getElementById('mainImg').classList.toggle("tgPaint");
        if ((! document.getElementById('mainImg').classList.contains('tgPaint') )){
            adapt_size()
            document.getElementById('text').hidden = false;
            document.getElementById('move').hidden = false;
        }else{
            document.getElementById('text').hidden = true;
            document.getElementById('move').hidden = true;
        }
    }
    if(elem.id == "text"){
        document.getElementById('mainImg').classList.toggle("tgText");
        if (document.getElementById('mainImg').classList.contains('tgText')){
            document.getElementById('paint').hidden = true;
            document.getElementById('move').hidden = true;
        }else if (! document.getElementById('mainImg').classList.contains('tgText')){
            document.getElementById('paint').hidden = false;
            document.getElementById('move').hidden = false;
        }
    }

     //
    if(hasMask){
        maskImg(1)
    }else{
        context.globalAlpha = 1;
    }
}

function maskImg(type_){
    if(! hasMask)
        hasMask = true
    var con = document.getElementById('mainImg')
    color = document.getElementById("color").value
    context.globalAlpha = 0.6;
    context.fillStyle=color
    context.fillRect(widths,heights,wid,hei);
    context.filter=filters;
    if (type_ == 1){
        context.drawImage(img, widths,heights,wid,hei);  
    }else if (type_ == 2){
        wid = con.width
        hei = con.height
        context.drawImage(img, widths,heights,wid,hei);  
    }
}

function adapt_size(){
    //download dialog:
    var con = document.getElementById('downImg')
    var canvas2 = /** @type {HTMLCanvasElement} */ (document.querySelector('#downImg'))
    context2 = canvas2.getContext('2d');
    var downProp = initWid/initHei;
    var downWid = (downProp >=1) ? initWid : initWid;
    var downHei = (downProp >=1) ? initHei : initHei;
    document.getElementById('downImg').width = initWid;
    document.getElementById('downImg').height = initHei;
    var downWidths = (downProp >=1) ? (widths) : 0;
    var downHeights = (downProp >=1) ? (heights) : 0;
    //maskImg(2)
    if ((! document.getElementById('mainImg').classList.contains('tgPaint') )){
        context2.clearRect(0,0,initWid,initHei);
        if (hasMask){
            color = document.getElementById("color").value
            context2.globalAlpha = 0.6;
            context2.fillStyle=color
            context2.fillRect(downWidths,downHeights,downWid,downHei);
        }
        context2.filter=filters;
        context2.drawImage(img, downWidths,downHeights,downWid,downHei); 
    }

    if (!isTexting ){
        context2.font = context.font
        context2.fillStyle = context.fillStyle
        context2.fillText(txtInp,txtX2,txtY2);
    }

    img.crossOrigin = 'Anonymous'
    var im = document.getElementById('downImg').toDataURL('image/png');
    if(document.getElementById('dialog').classList.contains('downloadImageDialog')){
        document.getElementById('downloadOriginal').href = im;  
    }
}

function modifyPaint(elem){
    elemValue = document.getElementsByName(elem.name)[0].value;
    switch (elem.name) {
        case 'colorPaint':
            colorPaint = elemValue;
            break;
        case 'sizePaint':
            sizePaint = parseInt(elemValue);
            break;
        default:
            break;
    }
}

function modifyText(elem){
    elemValue = document.getElementsByName(elem.name)[0].value;
    switch (elem.name) {
        case 'colorText':
            colorText = elemValue;
            break;
        case 'sizeText':
            sizeText = parseInt(elemValue);
            break;
        case 'fontStyles':
            fontStyle = elemValue;
            break;
        default:
            break;
    }
}

function writeText(px,py){
    updateCanvas()
    txtInp = document.getElementById("textField").value
    context.font = sizeText+"px " + fontStyle
    context.fillStyle = colorText
    txtX = px
    txtY = py
    context.fillText(txtInp,txtX,txtY);

    var con = document.getElementById('mainImg')
    context2.font = context.font
    context2.fillStyle = context.fillStyle
    txtX2 = parseInt(((px-widths)*initWid)/(con.width-2*(widths)))
    txtY2 = parseInt((initHei*py)/con.height)
    context2.fillText(txtInp,txtX2,txtY2)
    isTexting = true
}

img.onload = function() {
    initWid = img.width
    initHei = img.height
    var con = document.getElementById('mainImg');
    prop = img.width/img.height
    wid = parseInt(con.height * prop)
    hei = con.height
    widths = (con.width - wid)/2
    heights = 0
    context.drawImage(img, widths,heights,wid,hei); 
        adapt_size()
    document.getElementById('download').style.visibility='visible';
};

addEventListener('click',function(){
    //download tamanho da tela
    if((document.getElementById('mainImg').classList.contains('tgMove') || document.getElementById('mainImg').classList.contains('tgText')) && window.event.pageX > 80 && window.event.pageX < 1000 && window.event.pageY < 530){
        isMoving = ! isMoving;
    }
    var con = document.getElementById('mainImg')
    if ((! document.getElementById('mainImg').classList.contains('tgPaint') )){
        updateCanvas();
    }
    img.crossOrigin = 'Anonymous'
    var im1 = document.getElementById('mainImg').toDataURL('image/png');
    if(document.getElementById('dialog').classList.contains('downloadImageDialog')){
        document.getElementById('downloadTela').href = im1;
    }
    if(! document.getElementById('dialog').classList.contains('downloadImageDialog') && document.getElementById('mainImg').classList.contains('tgPaint') && window.event.pageX > 35 && window.event.pageX < 1000 && window.event.pageY < 530){
        isMoving = ! isMoving;
        if(isMoving){
            context.restore()
            context2.restore()
        } 
    }
    if(!(document.getElementById("text").classList.contains('tgFunction'))){
        document.getElementById('textFieldContainer').innerHTML = ''
        isTexting = false
    }

    img.crossOrigin = 'Anonymous'
    var im = document.getElementById('downImg').toDataURL('image/png');
    if(document.getElementById('dialog').classList.contains('downloadImageDialog')){
        document.getElementById('downloadOriginal').href = im;  
    }
    if (document.getElementById('mainImg').classList.contains('tgText') && isMoving && !(document.getElementById('mainImg').classList.contains('tgMove') )){
        var con = document.getElementById('textFieldContainer')
        var px  = window.event.pageX - 84
        var py = window.event.pageY - 12
        if(px < 980 && py < 620){
            con.innerHTML = '<input id="textField" name="textField" class="textField" type="text" placeholder="Insira o texto aqui" oninput="writeText('+px+', '+py+')">'        
            document.getElementById('textField').style.left=(px + 84)+"px"
            document.getElementById('textField').style.top=(py) +"px"
        }

    }
});

addEventListener('mousemove',function(){
    var con = document.getElementById('mainImg')
    if(document.getElementById('mainImg').classList.contains('tgMove') && isMoving && ! document.getElementById('mainImg').classList.contains('tgText') && ! document.getElementById('mainImg').classList.contains('tgPaint')){
        context.clearRect(0,0,con.width,con.height)   
        var px  = window.event.pageX - 75
        var py = window.event.pageY - 7
        widths = px - (wid/2)
        heights = py - (hei/2)
        context.drawImage(img, widths,heights,wid,hei);    
    }
    if (document.getElementById('mainImg').classList.contains('tgPaint') && isMoving && !(document.getElementById('mainImg').classList.contains('tgMove') ) && ! document.getElementById('mainImg').classList.contains('tgText')){
        var px  = window.event.pageX - 84
        var py = window.event.pageY - 12
        if (px > 23 && py > 12){
            context.fillStyle=colorPaint;
            context.beginPath()
            context.arc(px,py,sizePaint,0,Math.PI*2);
            context.fill();
            context2.fillStyle=context.fillStyle;
            context2.beginPath();
            context2.arc(parseInt(((px-widths)*initWid)/(con.width-2*(widths))),parseInt((initHei*py)/con.height),sizePaint,0,Math.PI*2);
            context2.fill()
        }
    }  
});

addEventListener('wheel',function(){
    var con = document.getElementById('mainImg')
    if(document.getElementById('mainImg').classList.contains('tgMove') ){
        context.clearRect(0,0,con.width,con.height)    
        if ((event.wheelDelta > 0 && event.wheelDelta < 140)){
            wid *= (event.wheelDelta/100)
            hei *= (event.wheelDelta/100)
            context.drawImage(img, widths,heights,parseInt(wid),parseInt(hei));
        }else if ((event.wheelDelta < 0 && event.wheelDelta > -140)){
            wid /= (event.wheelDelta/-100)
            hei /= (event.wheelDelta/-100)
            context.drawImage(img, widths,heights,parseInt(wid),parseInt(hei));
        }
    }
})

document.addEventListener('keydown',(event)=>{
    if(isTexting){
        if(event.keyCode==13 || (document.getElementById('text').style.backgroundColor == 'transparent')){
            document.getElementById('textFieldContainer').innerHTML = ''
            isTexting = false
        }
    }
});
