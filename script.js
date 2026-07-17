function calculateStatistics(){

    const input = document.getElementById("dataInput").value.trim();

    const message = document.getElementById("message");

    const values = input
        .split(/[\s,]+/)
        .map(Number)
        .filter(value => !isNaN(value));

    if(values.length < 2){

        message.style.display = "block";
        message.className = "message error";
        message.textContent = "Please enter at least two valid numbers.";

        return;
    }

    message.style.display = "block";
    message.className = "message success";
    message.textContent = "Statistics calculated successfully.";

    const sortedValues = [...values].sort((a,b)=>a-b);

    const n = values.length;

    const sum = values.reduce((total,value)=> total + value,0);

    const mean = sum / n;

    let median;

    const middle = Math.floor(n/2);

    if(n % 2 === 0){

        median = (sortedValues[middle-1] + sortedValues[middle]) / 2;

    }else{

        median = sortedValues[middle];

    }

    const frequency = {};

    values.forEach(value=>{

        frequency[value] = (frequency[value] || 0) + 1;

    });

    let maxFrequency = Math.max(...Object.values(frequency));

    let mode;

    if(maxFrequency === 1){

        mode = "No mode";

    }else{

        mode = Object.keys(frequency)
        .filter(value => frequency[value] === maxFrequency)
        .join(", ");

    }

    const minimum = sortedValues[0];

    const maximum = sortedValues[n-1];

    const range = maximum - minimum;

    const squaredDifference = values.map(value=>

        Math.pow(value - mean,2)

    );

    const variance = squaredDifference.reduce(

        (total,value)=> total + value,0

    )/(n-1);

    const sampleSD = Math.sqrt(variance);

    const cv = mean === 0 ? 0 : (sampleSD / mean) * 100;

    const meanSD = `${mean.toFixed(3)} ± ${sampleSD.toFixed(3)}`;

    document.getElementById("count").textContent = n;

    document.getElementById("mean").textContent = mean.toFixed(3);

    document.getElementById("median").textContent = median.toFixed(3);

    document.getElementById("mode").textContent = mode;

    document.getElementById("min").textContent = minimum.toFixed(3);

    document.getElementById("max").textContent = maximum.toFixed(3);

    document.getElementById("range").textContent = range.toFixed(3);

    document.getElementById("variance").textContent = variance.toFixed(3);

    document.getElementById("sd").textContent = sampleSD.toFixed(3);

    document.getElementById("cv").textContent = cv.toFixed(3) + "%";

    document.getElementById("meanSD").textContent = meanSD;

}

function clearData(){

    document.getElementById("dataInput").value = "";

    document.getElementById("count").textContent = "-";
    document.getElementById("mean").textContent = "-";
    document.getElementById("median").textContent = "-";
    document.getElementById("mode").textContent = "-";
    document.getElementById("min").textContent = "-";
    document.getElementById("max").textContent = "-";
    document.getElementById("range").textContent = "-";
    document.getElementById("variance").textContent = "-";
    document.getElementById("sd").textContent = "-";
    document.getElementById("cv").textContent = "-";
    document.getElementById("meanSD").textContent = "-";

    const message = document.getElementById("message");

    message.style.display = "none";

    message.textContent = "";

}

function copyResults(){

    const results = `Teegreen Descriptive Statistics

Number of Observations (n): ${document.getElementById("count").textContent}

Mean: ${document.getElementById("mean").textContent}

Median: ${document.getElementById("median").textContent}

Mode: ${document.getElementById("mode").textContent}

Minimum: ${document.getElementById("min").textContent}

Maximum: ${document.getElementById("max").textContent}

Range: ${document.getElementById("range").textContent}

Variance: ${document.getElementById("variance").textContent}

Sample SD: ${document.getElementById("sd").textContent}

Coefficient of Variation (CV): ${document.getElementById("cv").textContent}

Mean ± SD: ${document.getElementById("meanSD").textContent}`;

    navigator.clipboard.writeText(results);

    const message = document.getElementById("message");

    message.style.display = "block";
    message.className = "message success";
    message.textContent = "Results copied to clipboard.";

}

function downloadPDF(){

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Teegreen Descriptive Statistics", 20, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    let y = 40;

    const data = [

        ["Number of Observations (n)", document.getElementById("count").textContent],

        ["Mean", document.getElementById("mean").textContent],

        ["Median", document.getElementById("median").textContent],

        ["Mode", document.getElementById("mode").textContent],

        ["Minimum", document.getElementById("min").textContent],

        ["Maximum", document.getElementById("max").textContent],

        ["Range", document.getElementById("range").textContent],

        ["Variance", document.getElementById("variance").textContent],

        ["Sample SD", document.getElementById("sd").textContent],

        ["Coefficient of Variation (CV)", document.getElementById("cv").textContent],

        ["Mean ± SD", document.getElementById("meanSD").textContent]

    ];

    data.forEach(item=>{

        doc.text(`${item[0]}: ${item[1]}`,20,y);

        y += 10;

    });

    doc.save("Teegreen_Descriptive_Statistics.pdf");

}