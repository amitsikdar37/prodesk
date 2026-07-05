document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('dog-fetch-form');
    const breedInput = document.getElementById('breed-input');
    const inputError = document.getElementById('input-error');
    const fetchBtn = document.getElementById('fetch-btn');
    
    const loadingState = document.getElementById('loading-state');
    const errorState = document.getElementById('error-state');
    const errorMessage = document.getElementById('error-message');
    const emptyState = document.getElementById('empty-state');
    const resultState = document.getElementById('result-state');
    const dogImage = document.getElementById('dog-image');
    const dogBreedLabel = document.getElementById('dog-breed-label');

    const sanitizeHTML = (str) => {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    };

    const hideAllStates = () => {
        loadingState.classList.add('hidden');
        errorState.classList.add('hidden');
        emptyState.classList.add('hidden');
        resultState.classList.add('hidden');
        inputError.classList.add('hidden');
        breedInput.classList.remove('invalid');
    };

    const showLoading = () => {
        hideAllStates();
        loadingState.classList.remove('hidden');
        fetchBtn.disabled = true;
    };

    const showError = (msg) => {
        hideAllStates();
        errorState.classList.remove('hidden');
        errorMessage.textContent = msg;
        fetchBtn.disabled = false;
    };

    const showEmpty = () => {
        hideAllStates();
        emptyState.classList.remove('hidden');
        fetchBtn.disabled = false;
    };

    const showResult = (imageUrl, breedName) => {
        hideAllStates();
        dogImage.src = imageUrl;
        dogImage.alt = `Image of a ${breedName} dog`;
        dogBreedLabel.textContent = `Breed: ${breedName}`;
        resultState.classList.remove('hidden');
        fetchBtn.disabled = false;
    };

    const showInputError = (msg) => {
        inputError.textContent = msg;
        inputError.classList.remove('hidden');
        breedInput.classList.add('invalid');
        breedInput.focus();
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        console.log('[Analytics] User interacted with Dog API Fetcher');

        const rawInput = breedInput.value.trim();
        const sanitizedInput = sanitizeHTML(rawInput).toLowerCase();

        if (sanitizedInput && !/^[a-z\s-]+$/.test(sanitizedInput)) {
            showInputError('Invalid input. Please use only letters, spaces, or hyphens.');
            return;
        }

        showLoading();

        try {
            const apiKey = 'live_IXufiimwr2SiC4dLTMZq8gYeWiG1FYLSEgrQrRlSEeLvu1p94N64aB1o36QzHuuV';
            const headers = {
                'x-api-key': apiKey
            };

            let imageUrl = '';
            let breedDisplay = 'Random Dog';

            if (sanitizedInput) {
                const breedSearchRes = await fetch(`https://api.thedogapi.com/v1/breeds/search?q=${encodeURIComponent(sanitizedInput)}`, { headers });
                const breedData = await breedSearchRes.json();

                if (!breedSearchRes.ok) {
                    showError('Failed to fetch data from the server.');
                    return;
                }

                if (breedData.length === 0) {
                    showEmpty();
                    return;
                }

                const targetBreed = breedData[0];
                breedDisplay = targetBreed.name;

                const imageRes = await fetch(`https://api.thedogapi.com/v1/images/search?breed_id=${targetBreed.id}`, { headers });
                const imageData = await imageRes.json();

                if (!imageRes.ok || imageData.length === 0) {
                    showEmpty();
                    return;
                }
                
                imageUrl = imageData[0].url;
            } else {
                const randomRes = await fetch('https://api.thedogapi.com/v1/images/search', { headers });
                const randomData = await randomRes.json();

                if (!randomRes.ok || randomData.length === 0) {
                    showError('Failed to fetch data from the server.');
                    return;
                }

                imageUrl = randomData[0].url;
                if (randomData[0].breeds && randomData[0].breeds.length > 0) {
                    breedDisplay = randomData[0].breeds[0].name;
                }
            }

            if (imageUrl) {
                showResult(imageUrl, breedDisplay);
            } else {
                showEmpty();
            }

        } catch (error) {
            console.error('[Error] Network or parsing issue:', error);
            showError('Network error. Please check your connection and try again.');
        }
    });
});
