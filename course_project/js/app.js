(() => {
    "use strict";
    document.addEventListener("DOMContentLoaded", (() => {
        const API_KEY_CALENDAR = "zFoEOHjPw3c9gGHftKqErBE4QYiBLKCn";
        const API_KEY_TRANSLATE = "AIzaSyBWfmla3GAHbz59GlA419HSEnbrGRE-u8w";
        const tabButtons = document.querySelectorAll(".app__tab-btn");
        const tabs = document.querySelectorAll(".app__calculate-interval, .app__holidays");
        const startDateInput = document.getElementById("start-date");
        const endDateInput = document.getElementById("end-date");
        const intervalPresetSelect = document.getElementById("interval-preset");
        const countOptionsSelect = document.getElementById("count-options");
        const dayTypeSelect = document.getElementById("day-type");
        const calculateBtn = document.getElementById("calculate-btn");
        const intervalResults = document.getElementById("interval-results");
        const countrySelect = document.getElementById("country-select");
        const yearSelect = document.getElementById("year-select");
        const fetchHolidaysBtn = document.getElementById("fetch-holidays-btn");
        const holidayResults = document.getElementById("holiday-results");
        const languageSelect = document.getElementById("language-select");
        const elementsToTranslate = [];
        function setupTabSwitching() {
            tabButtons.forEach((button => {
                button.addEventListener("click", (() => {
                    tabButtons.forEach((btn => btn.classList.remove("active")));
                    button.classList.add("active");
                    const tabId = button.getAttribute("data-tab");
                    tabs.forEach((tab => {
                        tab.classList.toggle("hidden", tab.id !== tabId);
                    }));
                }));
            }));
        }
        function setupDateInputs() {
            startDateInput.addEventListener("change", (() => {
                endDateInput.disabled = !startDateInput.value;
                endDateInput.min = startDateInput.value;
            }));
            endDateInput.addEventListener("change", (() => {
                startDateInput.max = endDateInput.value || "";
            }));
        }
        function formatDate(date) {
            const dayNames = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];
            const monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
            return `${dayNames[date.getDay()]}, ${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
        }
        function displayIntervalResults(results) {
            intervalResults.innerHTML = "";
            if (results.length === 0) return;
            const table = document.createElement("table");
            table.className = "results-table";
            table.innerHTML = `\n      <thead>\n        <tr>\n          <th>Start Date</th>\n          <th>End Date</th>\n          <th>Result</th>\n        </tr>\n      </thead>\n      <tbody>\n        ${results.map((result => `\n          <tr>\n            <td>${result.startDate}</td>\n            <td>${result.endDate}</td>\n            <td>${result.result}</td>\n          </tr>\n        `)).join("")}\n      </tbody>\n    `;
            intervalResults.appendChild(table);
        }
        function calculateInterval() {
            const startDate = new Date(startDateInput.value);
            const endDate = new Date(endDateInput.value);
            if (isNaN(startDate) || isNaN(endDate)) {
                alert("Please select valid dates.");
                return;
            }
            const intervalPreset = intervalPresetSelect.value;
            const presetDays = intervalPreset === "week" ? 7 : 30;
            const countOption = countOptionsSelect.value;
            const dayType = dayTypeSelect.value;
            let totalDays = 0;
            let weekdays = 0;
            let weekends = 0;
            let countedDays = 0;
            for (let d = new Date(startDate); d <= endDate && countedDays < presetDays; d.setDate(d.getDate() + 1)) {
                totalDays++;
                if (d.getDay() === 0 || d.getDay() === 6) weekends++; else weekdays++;
                countedDays++;
            }
            let relevantDays = totalDays;
            let daysTypeText = "";
            if (dayType === "weekdays") {
                relevantDays = weekdays;
                daysTypeText = " with calculation for weekdays only";
            } else if (dayType === "weekends") {
                relevantDays = weekends;
                daysTypeText = " with calculation for weekends only";
            }
            let resultValue;
            let unit;
            switch (countOption) {
              case "hours":
                resultValue = relevantDays * 24;
                unit = "hours";
                break;

              case "minutes":
                resultValue = relevantDays * 24 * 60;
                unit = "minutes";
                break;

              case "seconds":
                resultValue = relevantDays * 24 * 60 * 60;
                unit = "seconds";
                break;

              default:
                resultValue = relevantDays;
                unit = "days";
            }
            const formattedStartDate = formatDate(startDate);
            const formattedEndDate = formatDate(endDate);
            const finalResultText = `${resultValue} ${unit}${daysTypeText}`;
            const results = JSON.parse(localStorage.getItem("intervalResults")) || [];
            results.unshift({
                startDate: formattedStartDate,
                endDate: formattedEndDate,
                result: finalResultText
            });
            if (results.length > 10) results.pop();
            localStorage.setItem("intervalResults", JSON.stringify(results));
            displayIntervalResults(results);
        }
        function loadResultsFromLocalStorage() {
            const results = JSON.parse(localStorage.getItem("intervalResults")) || [];
            displayIntervalResults(results);
        }
        function fetchCountries() {
            fetch(`https://calendarific.com/api/v2/countries?api_key=${API_KEY_CALENDAR}`).then((response => response.json())).then((data => {
                if (data.response && data.response.countries) populateCountrySelect(data.response.countries); else showError("Error fetching countries");
            })).catch((error => {
                console.error("Error:", error);
                showError("Error fetching countries");
            }));
        }
        function populateCountrySelect(countries) {
            countrySelect.innerHTML = '<option value="">Select a country</option>';
            countries.forEach((country => {
                const option = document.createElement("option");
                option.value = country["iso-3166"];
                option.textContent = country.country_name;
                countrySelect.appendChild(option);
            }));
        }
        function showError(message) {
            holidayResults.innerHTML = `<p class="error">${message}</p>`;
        }
        function initializeYearSelect() {
            const currentYear = (new Date).getFullYear();
            for (let year = 2001; year <= 2049; year++) {
                const option = document.createElement("option");
                option.value = year;
                option.textContent = year;
                yearSelect.appendChild(option);
            }
            yearSelect.value = currentYear;
            yearSelect.disabled = true;
        }
        function fetchHolidays(country, year) {
            fetch(`https://calendarific.com/api/v2/holidays?api_key=${API_KEY_CALENDAR}&country=${country}&year=${year}`).then((response => response.json())).then((data => {
                if (data.response && data.response.holidays) displayHolidays(data.response.holidays); else showError("Error fetching holidays");
            })).catch((error => {
                console.error("Error:", error);
                showError("Error fetching holidays");
            }));
        }
        function displayHolidays(holidays) {
            holidayResults.innerHTML = "";
            const table = document.createElement("table");
            table.className = "results-table";
            table.innerHTML = `\n      <thead>\n        <tr>\n          <th><button id="date-sort-btn" class="sortable">Date<i class="fa-solid fa-sort"></i></button></th>\n          <th>Holiday Name</th>\n        </tr>\n      </thead>\n      <tbody>\n        ${holidays.map((holiday => `\n          <tr>\n            <td>${formatDate(new Date(holiday.date.iso))}</td>\n            <td>${holiday.name}</td>\n          </tr>\n        `)).join("")}\n      </tbody>\n    `;
            holidayResults.appendChild(table);
            const dateSortBtn = document.getElementById("date-sort-btn");
            let ascending = true;
            dateSortBtn.addEventListener("click", (() => {
                sortTableByDate(table.querySelector("tbody"), ascending);
                ascending = !ascending;
            }));
        }
        function sortTableByDate(tbody, ascending) {
            const rowsArray = Array.from(tbody.rows);
            const sortedRows = rowsArray.sort(((rowA, rowB) => {
                const dateA = new Date(rowA.cells[0].textContent);
                const dateB = new Date(rowB.cells[0].textContent);
                return ascending ? dateA - dateB : dateB - dateA;
            }));
            tbody.innerHTML = "";
            tbody.append(...sortedRows);
        }
        function collectTextElements(element) {
            element.childNodes.forEach((child => {
                if (child.nodeType === Node.TEXT_NODE && child.textContent.trim().length > 0) {
                    elementsToTranslate.push(child);
                    const parent = child.parentNode;
                    if (!parent.hasAttribute("data-translate")) parent.setAttribute("data-translate", child.textContent.trim());
                } else if (child.nodeType === Node.ELEMENT_NODE) collectTextElements(child);
            }));
        }
        function translateText(text, targetLang) {
            return fetch(`https://translation.googleapis.com/language/translate/v2?key=${API_KEY_TRANSLATE}`, {
                method: "POST",
                body: JSON.stringify({
                    q: text,
                    target: targetLang
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response => response.json())).then((data => {
                if (data.data && data.data.translations) return data.data.translations[0].translatedText; else throw new Error("Error translating text");
            }));
        }
        function translatePage(targetLang) {
            elementsToTranslate.forEach((element => {
                const originalText = element.parentNode.getAttribute("data-translate");
                translateText(originalText, targetLang).then((translatedText => {
                    element.textContent = translatedText;
                })).catch((error => {
                    console.error("Error translating text:", error);
                }));
            }));
        }
        setupTabSwitching();
        setupDateInputs();
        fetchCountries();
        initializeYearSelect();
        loadResultsFromLocalStorage();
        calculateBtn.addEventListener("click", calculateInterval);
        countrySelect.addEventListener("change", (() => {
            yearSelect.disabled = !countrySelect.value;
        }));
        fetchHolidaysBtn.addEventListener("click", (() => {
            const country = countrySelect.value;
            const year = yearSelect.value;
            if (country && year) fetchHolidays(country, year); else showError("Please select both country and year");
        }));
        languageSelect.addEventListener("change", (() => {
            translatePage(languageSelect.value);
        }));
        collectTextElements(document.body);
        translatePage(languageSelect.value);
    }));
})();