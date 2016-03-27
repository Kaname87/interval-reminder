$(function(){

	// initialize
	var cnt = localStorage.getItem("option-cnt");
	for (var i =0; i < cnt; i++) {
		if (i >= 1) {
			// append form
			newOption = $("#option-0").clone(true);
			newOption.find("legend").text("No." + (i +1));
			newOption.attr('id', "option-" + i);
			newOption.find("fieldset").first().attr("id", "fs-" + i)
			$(".options").append(newOption);
		}
		var targetOption = $("#fs-" + i);
		var savedOption = JSON.parse(localStorage.getItem("option-" + i));
		targetOption.children(".enabled")[0].checked  = savedOption.enabled;
		targetOption.children(".minute")[0].value  = savedOption.minute;
		targetOption.children("output")[0].value  = savedOption.minute;
		targetOption.children(".message")[0].value  = savedOption.message;
	}

	// Minute Bar
	$(".minute").change(function(e){
		e.preventDefault();
		$(e.target).closest("fieldset").children("output")[0].value = $(e.target).val();
	});

	// Auto Saving
	$(".options").change(function(e){
		e.preventDefault();
		try {
			$(".option").each(function(i, elem){
				var fs_id = "#fs-" +i;
				var option = {
					'enabled': $(fs_id + " input.enabled")[0].checked,
					'message': $(fs_id + " input.message")[0].value,
					'minute':  $(fs_id + " input.minute")[0].value
				};
				localStorage.setItem("option-" + i, JSON.stringify(option));
			});
			localStorage.setItem("option-cnt", $(".option").size());
			$('#flash-message').fadeIn("slow").fadeOut("slow");
		} catch (e) {
			console.log(e);
		}
	});


	// Add
	$("#add").click(function(e){
		e.preventDefault();
		var size = $(".option").size()
		// copy from previous option
		var newOption = $($(".option")[size -1]).clone(true);
		// change lengend and id
		newOption.find("legend").text("No." + (size +1));
		newOption.attr('id', "option-" + size);
		newOption.find("fieldset").first().attr("id", "fs-" + size)
		// append
		$(".options").append(newOption);
	});

	// remove
	$("#remove").click(function(e){
		e.preventDefault();
		$(".option").each(function(i, elem){
			cleanStorage($(".option").size());
			if(i !== 0) {
				elem.remove();
			};
		});
	});

	function cleanStorage(lengh){
		localStorage.removeItem("option-cnt");
		for (var i =0; i < lengh; i++) {
			localStorage.removeItem("option-" + i);
		}
	}
});

