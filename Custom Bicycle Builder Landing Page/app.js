document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('bicycle-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = submitBtn.querySelector('.spinner');
    const errorSummary = document.getElementById('error-summary');
    
    const emptyState = document.getElementById('empty-state');
    const buildList = document.getElementById('build-list');

    const sanitizeHTML = (str) => {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    };

    const validateForm = () => {
        let isValid = true;
        const fields = ['customer-name', 'frame-type', 'wheel-size', 'frame-color'];
        
        fields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field.value.trim()) {
                field.classList.add('is-invalid');
                field.setAttribute('aria-invalid', 'true');
                isValid = false;
            } else {
                field.classList.remove('is-invalid');
                field.removeAttribute('aria-invalid');
            }
        });

        if (!isValid) {
            errorSummary.classList.remove('hidden');
            const firstInvalid = document.querySelector('.is-invalid');
            if (firstInvalid) {
                firstInvalid.focus();
            }
        } else {
            errorSummary.classList.add('hidden');
        }

        return isValid;
    };

    form.addEventListener('input', (e) => {
        if (e.target.classList.contains('is-invalid')) {
            e.target.classList.remove('is-invalid');
            e.target.removeAttribute('aria-invalid');
            
            if (!document.querySelector('.is-invalid')) {
                errorSummary.classList.add('hidden');
            }
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!validateForm()) {
            console.log('[Validation] Form submission prevented due to invalid fields.');
            return;
        }

        const customerNameRaw = document.getElementById('customer-name').value;
        const frameType = document.getElementById('frame-type').value;
        const wheelSize = document.getElementById('wheel-size').value;
        const frameColor = document.getElementById('frame-color').value;

        const buildData = {
            customerName: sanitizeHTML(customerNameRaw),
            frameType: sanitizeHTML(frameType),
            wheelSize: sanitizeHTML(wheelSize),
            frameColor: sanitizeHTML(frameColor),
            timestamp: new Date().toLocaleString()
        };

        submitBtn.disabled = true;
        btnText.textContent = 'Building...';
        spinner.classList.remove('hidden');

        setTimeout(() => {
            console.log('[Analytics] User interacted with Custom Bicycle Builder Landing Page. Action: Build Completed.');

            submitBtn.disabled = false;
            btnText.textContent = 'Build Bicycle';
            spinner.classList.add('hidden');
            form.reset();

            renderBuild(buildData);
        }, 2000);
    });

    const renderBuild = (data) => {
        if (!emptyState.classList.contains('hidden')) {
            emptyState.classList.add('hidden');
            buildList.classList.remove('hidden');
        }

        const li = document.createElement('li');
        li.className = 'build-item';
        
        const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

        li.innerHTML = `
            <h3>Order for: ${data.customerName}</h3>
            <p><span class="label">Frame Type:</span> ${capitalize(data.frameType)}</p>
            <p><span class="label">Wheel Size:</span> ${data.wheelSize}</p>
            <p><span class="label">Color:</span> ${capitalize(data.frameColor)}</p>
            <p><span class="label">Date:</span> <span class="text-subtle">${data.timestamp}</span></p>
        `;

        buildList.insertBefore(li, buildList.firstChild);
    };
});
