var adder = {

	chunkSize: 12,

	chunk: function (num, size) {
		size = size || this.chunkSize;
		num = this.prepend(num, (size - (String(num).length % size)) % size + String(num).length);
		var chunks = [];
		for (var i = 0; i < (num.length / size); i++) {
			chunks.push(num.substring(i * size, (i + 1) * size));
		}
		return chunks;
	},

	prepend: function (num, length) {
		num = num + '';
		while (num.length < length) {
			num = "0" + num;
		}
		return num;
	},

	replaceAt: function(str, index, char) {
		var array = str.split('');
		array[index] = char;
		return array.join('');
	},

	add: function (nums) {
		if (nums.constructor == Array) {
			allNum = true;
			for (var i = 0; i < nums.length; i++) {
				allNum = allNum && !isNaN(nums[i]);
			}
			if (allNum) {

				var total = [];
				for (var i = 0; i < nums.length; i++) {
					var chunked = this.chunk(nums[i]).reverse();
					if (i === 0) {
						total = chunked;
					} else {
						var carry = 0;
						for (var j = 0; j < chunked.length; j++) {
							total[j] = total[j] || 0;
							add = this.chunk(parseInt(total[j]) + parseInt(chunked[j]) + carry).reverse();
							total[j] = add[0];
							add.shift();
							carry = parseInt(add.reverse().join('') || 0);
						}
						total.push(carry);
					}
				}
				return total.reverse().join('').replace(/^0+/, '');
			} else {
				return 'Please provide valid numbers';
			}
		} else {
			return 'Please provide an array of numbers';
		}
	},

	subtract: function () {

	},

	multiply: function (num1, num2) {
		if (!isNaN(num1) && !isNaN(num2)) {
			num1 = String(num1);
			num2 = String(num2);
			entire = num1.length * num2.length;
			total = '0';
			for (var i = 1; i <= num1.length; i++) {
				for (var j = 1; j <= num2.length; j++) {
					add = String(parseInt(num1[num1.length - i]) * parseInt(num2[num2.length - j])) + Array(i + j - 1).join('0');
					total = this.add(total, add);
				}
			}
			return total;
		} else {
			return 'Please provide valid numbers';
		}
	}
}
