$(document).ready(function(){
	$("form").attr("autocomplete","off");
	$( "#make" ).focus(function() {
		console.log("Test");
		$(".arrowrequired").addClass("d-none");
		$(".custarrows").addClass("d-none");
		$(".makearraow").removeClass("d-none");
		$(".borderred").css({"border":"1px solid #dadada"})
	})
	$( "#modelid" ).focus(function() {
		hidearrow('modelarrow');
	})
	$( "#partid" ).focus(function() {
		hidearrow('partarrow');
	})
	$( "#yearid" ).focus(function() {
		hidearrow('yeararrow');
	})

	$( "#name" ).focus(function() {
		$(".arrowrequired").addClass("d-none");
		$(".custarrows").addClass("d-none");
		$(".namearrow").removeClass("d-none");
		$(".borderred").css({"border":"1px solid #dadada"})
		$("#name").css({"border":"1px solid #ec0000"})
	})

	$( "#phone" ).focus(function() {
		$(".arrowrequired").addClass("d-none");
		$(".custarrows").addClass("d-none");
		$(".custphonearrow").removeClass("d-none");
		$(".borderred").css({"border":"1px solid #dadada"})
		$("#phone").css({"border":"1px solid #ec0000"})
	})

	$( "#email" ).focus(function() {
		$(".arrowrequired").addClass("d-none");
		$(".custarrows").addClass("d-none");
		$(".custemailarrow").removeClass("d-none");
		$(".borderred").css({"border":"1px solid #dadada"})
		$("#email").css({"border":"1px solid #ec0000"})
	})

	$( "#zip" ).focus(function() {
		$(".arrowrequired").addClass("d-none");
		$(".custarrows").addClass("d-none");
		$(".custziparrow").removeClass("d-none");
		$(".borderred").css({"border":"1px solid #dadada"})
		$("#zip").css({"border":"1px solid #ec0000"})
	})

	$( ".btn-custom" ).focus(function() {
		$(".borderred").css({"border":"1px solid #dadada"})
		$(".custarrows").addClass("d-none");
	})

	$("#make").change(function(){
		var make = $("#make").val();
		var part = $("#partid").val();
		$("#yearid").html("");
		$("#yearid").html("<option value=''>Select Year</option>");
		fetch('https://partsapi.tk/models/'+ make)
		.then(response => response.json())
		.then((data) => {
			let output = '<option value="">Select Model</option>'
			data.forEach(function(model)
			{
				output += `<option value="${model.value}">${model.value}</option>`
			})
			document.getElementById('modelid').innerHTML = output
		});
		$(".arrowrequired").addClass("d-none");
  		$(".custarrows").addClass("d-none");
  		$(".borderred").css({"border":"1px solid #dadada"})
		$(".modelarrow").removeClass("d-none");
		$("#modelid").focus();
		  
	});
				
});

function hidearrow(op)
{
		$(".arrowrequired").addClass("d-none");
		$(".custarrows").addClass("d-none");
		$("."+op).removeClass("d-none");
		$(".borderred").css({"border":"1px solid #dadada"})
}
function getParts(){
		var make = $("#make").val();
		var model = $("#modelid").val();
		fetch('https://partsapi.tk/parts/'+make+'/'+model)
		.then(response => response.json())
		.then((data) => {
			let output = '<option value="">Select Part</option>'
			data.forEach(function(part)
			{
				output += `<option value="${part.value}">${part.value}</option>`
			})
			document.getElementById('partid').innerHTML = output
		});
		$(".arrowrequired").addClass("d-none");
  		$(".custarrows").addClass("d-none");
  		$(".borderred").css({"border":"1px solid #dadada"})
		$(".partarrow").removeClass("d-none");
		$("#partid").focus();
		  
}

function getYears(){

	var make = $("#make").val();
	var model = $("#modelid").val();
	var part = $("#partid").val();
	fetch('https://partsapi.tk/years/'+make+'/'+model+'/'+part)
		.then(response => response.json())
		.then((data) => {

			let output = `<select name='yearid' id='yearid' class="form-control" onChange="TakeOptions0();" onfocus="hidearrow('yeararrow');">`
			output += '<option value="">Select Year</option>'

			data.forEach(function(year)
			{
				output += `<option value="${year.value}">${year.value}</option>`
			})
			document.getElementById('year_list').innerHTML = output
		});
		$(".arrowrequired").addClass("d-none");
		$(".custarrows").addClass("d-none");
		$(".borderred").css({"border":"1px solid #dadada"})
	 	$(".yeararrow").removeClass("d-none");
	 	$("#yearid").focus();
}

function TakeYear_aph(part,model)
{
	xpart=replaceAll(part,"-"," ");
	$("#mpart").html(xpart);
	if(model=='')
	{
		model=document.getElementById('modelid').value;
	}
	model=replaceAll(model,"&","_amps_");
	var optionValue = jQuery("select[name='modelid']").val();	
	for(i=1;i<=10;i++)
	{
		$(".option"+i).addClass("d-none");
		$("#newoption"+i).val("");
	}		
	jQuery("#year_list")
		.load('get-model-part-aph.php', "model="+model+"&part="+part+"&status=1", function(response){
			if(response) {
			
				jQuery("#year_list").css('display', '');
				$("#year_list").html(response);
				$('#yearid').focus();
				$(".arrowrequired").addClass("d-none");
				$(".custarrows").addClass("d-none");
				$(".borderred").css({"border":"1px solid #dadada"})
				$(".yeararrow").removeClass("d-none");
					jQuery("#fbif")
					.load('remapfb.php', "st=1", function(response){
						if(response) {
							 
							$("#fbif").html(response);
						} 
				});			
			} else {
				jQuery("#year_list").css('display', 'none');
			}
});			
			
			var key=part;
			var mdlopt=optionValue;
			

}

function TakeOptions0()
{			
			var make = $("#make").val();
			var model = $("#modelid").val();
			var part = $("#partid").val();
			var year = $("#yearid").val();
			var optionValue =make+'_'+model+'_'+part+'_'+year;
			var is_data = 0
			fetch('https://partsapi.tk/options/1/'+optionValue)
			.then(response => response.json())
			.then((data) => {

				let output = `<select name='option1id' id='option1id' class="form-control" onChange="TakeOptions();" onfocus="hidearrow('option1arrow');">`
				output += '<option value="">Select Option1</option>'
				data.forEach(function(option)
				{
					is_data = 1
					output += `<option value="${option.value}">${option.value}</option>`
				})
				console.log(JSON.stringify(output))
				if(is_data) {
					document.getElementById('alloptions').innerHTML = output
					$(".arrowrequired").addClass("d-none");
					$(".custarrows").addClass("d-none");
					$(".borderred").css({"border":"1px solid #dadada"})
					$(".option1").removeClass("d-none"); 
					$(".option1arrow").removeClass("d-none");
					$("#option1id").focus();
				}
				else {  
					console.log(is_data)
					$("#name").focus();
				}
			});
}

function TakeOptions(id)
{
	var make = $("#make").val();
	var model = $("#modelid").val();
	var part = $("#partid").val();
	var year = $("#yearid").val();
	var option1 = $('#option1id').val()
	var optionValue =make+'_'+model+'_'+part+'_'+year+'_'+option1;
	var is_data = 0
	fetch('https://partsapi.tk/options/2/'+optionValue)
	.then(response => response.json())
	.then((data) => {

		let output = `<select name='option2id' id='option2id' class="form-control" onChange="TakeOptions1();" onfocus="hidearrow('option2arrow');">`
		output += '<option value="">Select Option2</option>'
		data.forEach(function(option)
		{
			is_data = 1
			output += `<option value="${option.value}">${option.value}</option>`
		})		
		console.log(JSON.stringify(output))
		if(is_data) {
			document.getElementById('alloptions1').innerHTML = output
			$(".arrowrequired").addClass("d-none");
			$(".custarrows").addClass("d-none");
			$(".borderred").css({"border":"1px solid #dadada"})
			$(".option2").removeClass("d-none"); 
			$(".option2arrow").removeClass("d-none");
			$("#option2id").focus();
		}
		else {  $("#name").focus();}
	});


}

function TakeOptions1(id)
{			
	var make = $("#make").val();
	var model = $("#modelid").val();
	var part = $("#partid").val();
	var year = $("#yearid").val();
	var options = $('#option1id').val()+'|'+$('#option2id').val()
	var optionValue =make+'_'+model+'_'+part+'_'+year+'_'+ options;
	var is_data = 0
	fetch('https://partsapi.tk/options/3/'+optionValue)
	.then(response => response.json())
	.then((data) => {

		let output = `<select name='option3id' id='option3id' class="form-control" onChange="TakeOptions2();" onfocus="hidearrow('option3arrow');">`
		output += '<option value="">Select Option3</option>'
		data.forEach(function(option)
		{
			is_data = 1
			output += `<option value="${option.value}">${option.value}</option>`
		})		
		console.log(JSON.stringify(output))
		if(is_data) {
			document.getElementById('alloptions2').innerHTML = output
			$(".arrowrequired").addClass("d-none");
			$(".custarrows").addClass("d-none");
			$(".borderred").css({"border":"1px solid #dadada"})
			$(".option3").removeClass("d-none"); 
			$(".option3arrow").removeClass("d-none");
			$("#option3id").focus();
		}
		else {  $("#name").focus();}
	});

}

function TakeOptions2(id)
{
	var make = $("#make").val();
	var model = $("#modelid").val();
	var part = $("#partid").val();
	var year = $("#yearid").val();
	var options = $('#option1id').val()+'|'+$('#option2id').val()+'|'+$('#option3id').val()
	var optionValue =make+'_'+model+'_'+part+'_'+year+'_'+ options;
	var is_data = 0
	fetch('https://partsapi.tk/options/4/'+optionValue)
	.then(response => response.json())
	.then((data) => {

		let output = `<select name='option4id' id='option4id' class="form-control" onChange="TakeOptions3();" onfocus="hidearrow('option4arrow');">`
		output += '<option value="">Select Option4</option>'
		data.forEach(function(option)
		{
			is_data = 1
			output += `<option value="${option.value}">${option.value}</option>`
		})		
		console.log(JSON.stringify(output))
		if(is_data) {
			document.getElementById('alloptions3').innerHTML = output
			$(".arrowrequired").addClass("d-none");
			$(".custarrows").addClass("d-none");
			$(".borderred").css({"border":"1px solid #dadada"})
			$(".option4").removeClass("d-none"); 
			$(".option4arrow").removeClass("d-none");
			$("#option4id").focus();
		}
		else {  $("#name").focus();}
	});
}

function TakeOptions3(id)
{
	var make = $("#make").val();
	var model = $("#modelid").val();
	var part = $("#partid").val();
	var year = $("#yearid").val();
	var options = $('#option1id').val()+'|'+$('#option2id').val()+'|'+$('#option3id').val()+'|'+$('#option4id').val()
	var optionValue =make+'_'+model+'_'+part+'_'+year+'_'+ options;
	var is_data = 0
	fetch('https://partsapi.tk/options/5/'+optionValue)
	.then(response => response.json())
	.then((data) => {

		let output = `<select name='option5id' id='option5id' class="form-control" onfocus="hidearrow('option4arrow');">`
		output += '<option value="">Select Option5</option>'
		data.forEach(function(option)
		{
			is_data = 1
			output += `<option value="${option.value}">${option.value}</option>`
		})		
		console.log(JSON.stringify(output))
		if(is_data) {
			document.getElementById('alloptions4').innerHTML = output
			$(".arrowrequired").addClass("d-none");
			$(".custarrows").addClass("d-none");
			$(".borderred").css({"border":"1px solid #dadada"})
			$(".option5").removeClass("d-none"); 
			$(".option5arrow").removeClass("d-none");
			$("#option5id").focus();
		}
		else {  $("#name").focus();}
	});

}


function TakeOptions4(id)
{
			for(i=6;i<=10;i++)
			{
				$(".option"+i).addClass("d-none");
				$("#newoption"+i).val("");
			}	
			var optionValue = id;
			if(optionValue!='')
			{
			jQuery("#alloptions5")
				.load('splitoptions5.php', "link="+optionValue+"&status=1", function(response){
					if(response) {
						$("#alloptions5").show();
						$("#alloptions5").html(response);
						if(document.getElementById('newoption6'))
						{
							$("#newoption6").focus();
							$(".custarrows").addClass("d-none");
							$(".borderred").css({"border":"1px solid #dadada"})
						}
					} 
			});		
			}


}

function TakeOptions5(id)
{
			for(i=7;i<=10;i++)
			{
				$(".option"+i).addClass("d-none");
				$("#newoption"+i).val("");
			}	
			var optionValue = id;
			if(optionValue!='')
			{
			jQuery("#alloptions6")
				.load('splitoptions6.php', "link="+optionValue+"&status=1", function(response){
					if(response) {
						$("#alloptions6").show();
						$("#alloptions6").html(response);
						if(document.getElementById('newoption7'))
						{
							$("#newoption7").focus();
							$(".custarrows").addClass("d-none");
							$(".borderred").css({"border":"1px solid #dadada"})
						}
					} 
			});			
			}


}


function TakeOptions6(id)
{
			for(i=8;i<=10;i++)
			{
				$(".option"+i).addClass("d-none");
				$("#newoption"+i).val("");
			}	
			var optionValue = id;
			if(optionValue!='')
			{
			jQuery("#alloptions7")
				.load('splitoptions7.php', "link="+optionValue+"&status=1", function(response){
					if(response) {
						$("#alloptions7").show();
						$("#alloptions7").html(response);
						if(document.getElementById('newoption8'))
						{
							$("#newoption8").focus();
							$(".custarrows").addClass("d-none");
							$(".borderred").css({"border":"1px solid #dadada"})
						}
					} 
			});			
			}


}

function TakeOptions7(id)
{
			for(i=9;i<=10;i++)
			{
				$(".option"+i).addClass("d-none");
				$("#newoption"+i).val("");
			}	
			var optionValue = id;
			if(optionValue!='')
			{
			jQuery("#alloptions8")
				.load('splitoptions8.php', "link="+optionValue+"&status=1", function(response){
					if(response) {
						$("#alloptions8").show();
						$("#alloptions8").html(response);
						if(document.getElementById('newoption9'))
						{
							$("#newoption9").focus();
							$(".custarrows").addClass("d-none");
							$(".borderred").css({"border":"1px solid #dadada"})
						}
					} 
			});			
			}

}


function TakeOptions8(id)
{			
			for(i=10;i<=10;i++)
			{
				$(".option"+i).addClass("d-none");
				$("#newoption"+i).val("");
			}	
			var optionValue = id;
			if(optionValue!='')
			{
			jQuery("#alloptions9")
				.load('splitoptions9.php', "link="+optionValue+"&status=1", function(response){
					if(response) {
						$("#alloptions9").show();
						$("#alloptions9").html(response);
						if(document.getElementById('newoption10'))
						{
							$("#newoption10").focus();
							$(".custarrows").addClass("d-none");
							$(".borderred").css({"border":"1px solid #dadada"})
						}
					} 
			});			
			}

}

function TakeOptions9(id)
{
			var optionValue = id;
			if(optionValue!='')
			{
			jQuery("#alloptions10")
				.load('splitoptions10.php', "link="+optionValue+"&status=1", function(response){
					if(response) {
						$("#alloptions10").show();
						$("#alloptions10").html(response);
						if(document.getElementById('newoption11'))
						{
							$("#newoption11").focus();
							$(".custarrows").addClass("d-none");
							$(".borderred").css({"border":"1px solid #dadada"})
						}
						
					} 
			});			

			}
}


function replaceAll(txt, replace, with_this) {
  return txt.replace(new RegExp(replace, 'g'),with_this);
} 

var d = document;
function trimWhitespace(string)
{
	var newString  = '';
	var substring  = '';
	beginningFound = false;

	for (var i = 0; i < string.length; i++)
	{

		// copy non-whitespace characters
		if (string.charAt(i) != ' ' && string.charCodeAt(i) != 9)
		{

			//if the temporary string contains some whitespace characters,copy them first
			if (substring != '')
			{
				newString += substring;
				substring = '';
			}
			newString += string.charAt(i);
			if (beginningFound == false) beginningFound = true;
		}

		// hold whitespace characters in a temporary string if they follow a 	non-whitespace character
		else if (beginningFound == true) substring += string.charAt(i);
	}
	return newString;
}

function chkForm()
{
	
	if(trimWhitespace(d.qapform.make.value).length<1)
	{
		alert('Please Select Make!');
		d.qapform.make.focus();
		return false;
	}

	document.getElementById('hostname').setAttribute('value', 'https://' + document.location.hostname)

	if(trimWhitespace(d.qapform.modelid.value).length<1)
	{
		alert('Please Select Model!');
		d.qapform.modelid.focus();
		return false;
	}
	if(trimWhitespace(d.qapform.partid.value).length<1)
	{
		alert('Please Select Part!');
		d.qapform.partid.focus();
		return false;
	}

	if(trimWhitespace(d.qapform.yearid.value).length<1)
	{
		alert('Please Select Year!');
		d.qapform.yearid.focus();
		return false;
	}
	

	if(document.getElementById('newoption1'))
	{
		if(trimWhitespace(d.qapform.newoption1.value).length<1)
		{
			alert('Please Select Option1!');
			d.qapform.newoption1.focus();
			return false;
		}
	}

	if(document.getElementById('newoption2'))
	{
		if(trimWhitespace(d.qapform.newoption2.value).length<1)
		{
			alert('Please Select Option2!');
			d.qapform.newoption2.focus();
			return false;
		}
	}

	if(document.getElementById('newoption3'))
	{
		if(trimWhitespace(d.qapform.newoption3.value).length<1)
		{
			alert('Please Select Option3!');
			d.qapform.newoption3.focus();
			return false;
		}
	}

	if(document.getElementById('newoption4'))
	{
		if(trimWhitespace(d.qapform.newoption4.value).length<1)
		{
			alert('Please Select Option4!');
			d.qapform.newoption4.focus();
			return false;
		}
	}
	if(document.getElementById('newoption5'))
	{
		if(trimWhitespace(d.qapform.newoption5.value).length<1)
		{
			alert('Please Select Option5!');
			d.qapform.newoption5.focus();
			return false;
		}
	}
	if(document.getElementById('newoption6'))
	{
		if(trimWhitespace(d.qapform.newoption6.value).length<1)
		{
			alert('Please Select Option6!');
			d.qapform.newoption6.focus();
			return false;
		}
	}
	if(document.getElementById('newoption7'))
	{
		if(trimWhitespace(d.qapform.newoption7.value).length<1)
		{
			alert('Please Select Option7!');
			d.qapform.newoption7.focus();
			return false;
		}
	}
	if(document.getElementById('newoption8'))
	{
		if(trimWhitespace(d.qapform.newoption8.value).length<1)
		{
			alert('Please Select Option8!');
			d.qapform.newoption8.focus();
			return false;
		}
	}
	if(document.getElementById('newoption9'))
	{
		if(trimWhitespace(d.qapform.newoption9.value).length<1)
		{
			alert('Please Select Option9!');
			d.qapform.newoption9.focus();
			return false;
		}
	}
	if(document.getElementById('newoption10'))
	{
		if(trimWhitespace(d.qapform.newoption10.value).length<1)
		{
			alert('Please Select Option10!');
			d.qapform.newoption10.focus();
			return false;
		}
	}
	
	if(trimWhitespace(d.qapform.name.value).length < 1)
	{
		alert('Customer Name is Required!');
		d.qapform.name.focus();
		return false;
	}

	if(trimWhitespace(d.qapform.phone.value).length < 1 )
	{
		alert('Phone # is Required');
		d.qapform.phone.focus();
		return false;
	}
	if(trimWhitespace(d.qapform.phone.value).length < 10)
	{
				alert('Incorrect Phone #');
				//d.qapform.phone.value = '';
				d.qapform.phone.focus();
				return false;
	}
	if(trimWhitespace(d.qapform.email.value).length < 1)
	{
		alert('Email Address is Required!');
		d.qapform.email.focus();
		return false;
	}
	x = d.qapform.email.value;
	var atpos=x.indexOf("@");
	var dotpos=x.lastIndexOf(".");

	if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length)
	{
		  alert("Not a valid e-mail address");
		  d.qapform.email.value = '';
		  d.qapform.email.focus();
		  return false;
    }
 	if(trimWhitespace(d.qapform.zip.value).length<1)
	{
		alert('Zip Code is Required!');
		d.qapform.zip.focus();
		return false;
	}

	if (!validZip(d.qapform.zip.value)) 
	{
		alert ("Incorrect US or Canadian Postal Code Format.");
		return false;
	}

		make = document.getElementById('make').value;
		model = document.getElementById('modelid').value;
		part = document.getElementById('partid').value;
		year= document.getElementById('yearid').value;
		model=replaceAll(model,make,"");
		model=replaceAll(model,"_","");
		//alert( make + '/' + model + ' /' +part +'/' + year);
	


	var filter=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
	if (filter.test(d.qapform.email.value)){
	  return true;
	}else{
	alert("Please Enter a valid email address!")
		d.qapform.email.focus();
		return false;
	}
	
		


}
function upperMe() { 
	//alert(document.getElementById("zip").value)
    document.getElementById("zip").value = document.getElementById("zip").value.toUpperCase(); 
}

function validZip(zip) {  
      var reUS = /^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/, // US Zip  
         reCA = /^([A-Z][0-9][A-Z])\s*([0-9][A-Z][0-9])$/; // CA Zip  
     
    return zip.match(reUS) || zip.match(reCA);  
}  			  

function nameval(nval)
{
	//alert(nval);
	re = /^[A-Za-z]+$/;
	if(re.test(nval))
	{
		//alert('Valid Name.');
		return true;
	}
	else
	{
		alert('Invalid Name!');
		d.qapform.name.value='';

	}
	
}
function cityval(nval)
{
	//alert(nval);
	re = /^[A-Za-z]+$/;
	if(re.test(nval))
	{
		//alert('Valid city.');
		return true;
	}
	else
	{
		alert('Invalid city.');
		d.qapform.city.value='';

	}
	
}
function emailval()
{
	
	var nval=d.qapform.email.value;
	//alert(nval);
	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if (filter.test(nval)){
	  return true;
	}else{
	alert("Please Enter a valid email address!")
	d.qapform.email.focus();
		return false;
	}

	
}


function chkQty1(code)
{
	xajax_updateQty(code);
}
function specNotes2(gtot)
{
		jQuery.ajax({
				type: "GET",
				url: "updateTotal.php",
				data: "total="+gtot+"&status=1",
				success: function(response){
					window.location = "https://test.autopartshub.com/checkout.php";
				}
			});			 


}
function gocheck(p)
{

	d.f1.page.value = p;
	d.f1.submit();
}
function jm_phonemask(t)
	{var patt1 = /(\d{3}).*(\d{3}).*(\d{4})/;
	var patt2 = /^\((\d{3})\).(\d{3})-(\d{4})$/;
	var str = t.value;
	if(str[0]==1)
	{
		str=str.substring(1);
		t.value=t.value.substring(1);
	}
	var result;
	if (!str.match(patt2))
	{result = str.match(patt1);
	if (result!= null)
	{t.value = t.value.replace(/[^\d]/gi,'');
	str = '(' + result[1] + ') ' + result[2] + '-' + result[3];
	t.value = str;
	}else{
	if (t.value.match(/[^\d]/gi))
	t.value = t.value.replace(/[^\d]/gi,'');
	
}}}

function phonecheck(Stringval)
{
	 var strChar0 = Stringval.charAt(0);
	 var strChar4 = Stringval.charAt(4);
	 var strChar8 = Stringval.charAt(9);
	 var strlength = Stringval.length;
	 if(strChar0 != '(' || strChar4 !=')' || strChar8 != '-' || strlength != 14 )
	{
		 return true;
	}

	else
	{
		return false;
	}
}

function CheckPhone()
{
		var cphone=  document.getElementById("phone").value;
		if(cphone.length>=3)
	   {
			$.post("phonecheck.php",{phoneno: cphone},function(data, status){
			if(data=='1')
			{
				document.getElementById("pmsg").style.display='none';
			}else
			{
				document.getElementById("pmsg").style.display='block';
				document.getElementById("pmsg").innerHTML="<span onclick='closebox()'>X</span> Hey! To get the right part, we need to talk to you.  So please give us an account phone number.";
			}
		});
	   }
	
}

function validateP()
{
	var cphone=  document.getElementById("phone").value;
	   if(cphone.length<10 )
	   {
				$("#pmsg").removeClass("d-none");
				$("#pmsg").html("<span onclick='closebox()'>X</span> Hey! To get the right part, we need to talk to you.  So please give us an aaccount phone number.");
				$( "#pmsg" ).show( "fadeDown", function() {
				});
	   }
}

function closebox()
{
	document.getElementById("pmsg").style.display='none';
	document.getElementById("email").focus();
}
// CODE ENDS
// -->s