# Running Calculators

## What is Running Calculator?

Running Calculators is a website for Runners that allow you to:

* calculate your training pace based on your current fitness level;
* calculate your training heart zone based on maximum and rest heart rate;
* predict your race time for an event based on others events on different distance;
* estimate your Body Mass Index (BMI) and Body Fat percentage;
* calculate pace, time and distance for a running event.

## Why another Running Calculator?

Running Calculators is not something new on the web. There are tons of Running Calculators out there, but not all are good. With time I learned the pro and cons of each calculator and I started to use regularly only few of them. The problem was that these calculators were on different websites so each time I had to look for them on Google. Some of them are on websites dedicated to fitness and running that are full of ads, video and other useless stuff that disturb the use of the software.

I am also a Programmer and I needed to learn the Javascript language for my job. When I need to learn a language I always try to create a mini project from scratch because I know this is the best approach to learn it. 

Why not try to implement a simple web page with all my favourites Running Calculators?

## How to use Running Calculators?

Access to the [Running Calculators web site](https://runningcalculators.herokuapp.com/) and select the menu option you need:

* **Heart Rate Zone**, calculate your training heart zone based on maximum and rest heart rate. The calculator is based on [Karvonen method](https://en.wikipedia.org/wiki/Heart_rate#Karvonen_method) modified. The classic Karvonen method calculate the training zone starting from maximum and rest heart rates. The maximum heart rate is estimated with the formula (220-age). The calculator allow you to use this formula only if you do not know in advance you Maximum Heart Rate. However, my suggestion is always to [calculate it on field or in a race](https://www.polar.com/blog/calculate-maximum-heart-rate-running/) because the formula is quite inaccurate. For example, according to the formula my maximum heart rate should be (220-43)=177 while I verified in a race that it is 188.
* **Pace Calculator**, calculate the pace (in min/Km or min/Miles) starting from time and distance. It is also possible to calculate distance starting from time and pace or time starting from the other two variables.
* **Race Predictor**, this calculator predicts your estimated time and pace for any popular race distance from 5K to the Marathon starting from the result of a previous race. The calculator is based on Pete Riegel formula published on American Scientist in the late 70s.
* **Training pace**, in Running it is very important to do a specific workout to the right pace based on current fitness level. The calculator estimate your current fitness level starting from the time of a recent race. The default one is the 10K because its average pace is considered equal to the Anaerobic Threshold. From this pace it is possible estimate the training pace for slow and long run, for steady and tempo run and also for repeat and interval training. This estimation is based on information reported in Orlando Pizzolato (two time New York Marathon Winner in the middle of 80s) book [Correre secondo Orlando Pizzolato. Tutta l'esperienza e la passione diuna vita di corsa](https://www.amazon.it/correre-secondo-orlando-pizzolato/dp/B00E7P71QA).
* **Body Composition**, this calculator allow you to calculate your BMI and Body Fat. Weight is one of the most important factor for runners, but it alone does not allow you to determine whether you are obese or not. BMI compare weight with height and provide such kind of information. But even BMI is not a perfect indicator, in fact according to it Arnold Schwarznegger is considered obese while he weight above the average due to muscles. Body fat allow then to understand how much fat your body have and how much you should lose.
