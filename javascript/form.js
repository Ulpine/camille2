// ===== CONTACT FORM JAVASCRIPT =====
class ContactFormManager {
    constructor() {
        // Attendre que tous les éléments soient chargés
        this.initializeElements();

        if (this.allElementsFound()) {
            this.init();
        } else {
            console.error('Certains éléments du formulaire sont manquants');
        }
    }

    initializeElements() {
        this.form = document.getElementById('contactForm');
        this.formSection = document.getElementById('contactFormSection');
        this.demanderDevisBtn = document.getElementById('demanderDevisBtn');
        this.submitBtn = document.getElementById('submitBtn');
        this.cancelBtn = document.getElementById('cancelBtn');
        this.loadingSpinner = document.getElementById('loadingSpinner');
        this.submitText = document.getElementById('submitText');
        this.submitIcon = document.getElementById('submitIcon');
        this.successMessage = document.getElementById('successMessage');
    }

    allElementsFound() {
        return this.form && this.formSection && this.demanderDevisBtn &&
               this.submitBtn && this.cancelBtn && this.loadingSpinner &&
               this.submitText && this.submitIcon && this.successMessage;
    }

    init() {
        this.bindEvents();
        this.setupValidation();
        console.log('ContactFormManager initialisé avec succès');
    }

    bindEvents() {
        // Afficher le formulaire quand on clique sur "Demander un devis"
        this.demanderDevisBtn.addEventListener('click', () => {
            this.showForm();
        });

        // Gérer tous les liens "Contactez-nous" qui pointent vers #ctaSection
        this.setupContactLinks();

        // Cacher le formulaire quand on clique sur "Annuler"
        this.cancelBtn.addEventListener('click', () => {
            this.hideForm();
        });

        // Soumettre le formulaire
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // Validation en temps réel
        const inputs = this.form.querySelectorAll('.form-input, .form-select, .form-textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });

        // Validation de la checkbox RGPD
        const rgpdCheckbox = document.getElementById('rgpd');
        if (rgpdCheckbox) {
            rgpdCheckbox.addEventListener('change', () => {
                if (rgpdCheckbox.checked) {
                    this.clearFieldError(rgpdCheckbox);
                }
            });
        }
    }

    setupContactLinks() {
        // Trouver tous les liens qui pointent vers #ctaSection
        const contactLinks = document.querySelectorAll('a[href="#ctaSection"]');

        contactLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.showForm();
            });
        });

        // Alternative : si vous préférez cibler spécifiquement le lien dans la FAQ
        const faqContactBtn = document.querySelector('.faq-cta .btn');
        if (faqContactBtn) {
            faqContactBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showForm();
            });
        }
    }

    showForm() {
        this.formSection.classList.add('visible');
        // Scroll smooth vers le formulaire après un petit délai
        setTimeout(() => {
            this.formSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 300);
    }

    hideForm() {
        this.formSection.classList.remove('visible');
        this.resetForm();
        // Scroll vers la section CTA
        const ctaSection = document.querySelector('.cta-section');
        if (ctaSection) {
            ctaSection.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }

    setupValidation() {
        this.validationRules = {
            prenom: {
                required: true,
                minLength: 2,
                message: 'Le prénom doit contenir au moins 2 caractères'
            },
            nom: {
                required: true,
                minLength: 2,
                message: 'Le nom doit contenir au moins 2 caractères'
            },
            email: {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Veuillez saisir un email valide'
            },
            telephone: {
                required: false,
                pattern: /^(?:(?:\+33|0)[1-9](?:[-.\s]?[0-9]{2}){4})$/,
                message: 'Format de téléphone français invalide'
            },
            pack: {
                required: true,
                message: 'Veuillez choisir un pack'
            },
            message: {
                required: true,
                minLength: 10,
                message: 'Votre message doit contenir au moins 10 caractères'
            },
            rgpd: {
                required: true,
                type: 'checkbox',
                message: 'Vous devez accepter le traitement de vos données'
            }
        };
    }

    validateField(field) {
        const fieldName = field.name;
        const rule = this.validationRules[fieldName];

        if (!rule) return true;

        const value = field.type === 'checkbox' ? field.checked : field.value.trim();
        let isValid = true;
        let errorMessage = rule.message;

        // Vérifier si le champ est requis
        if (rule.required) {
            if (field.type === 'checkbox') {
                isValid = value === true;
            } else {
                isValid = value !== '';
            }
        }

        // Si le champ n'est pas requis et est vide, il est valide
        if (!rule.required && value === '') {
            isValid = true;
        }

        // Vérifications supplémentaires si le champ n'est pas vide
        if (isValid && value !== '' && field.type !== 'checkbox') {
            // Vérifier la longueur minimale
            if (rule.minLength && value.length < rule.minLength) {
                isValid = false;
            }

            // Vérifier le pattern
            if (rule.pattern && !rule.pattern.test(value)) {
                isValid = false;
            }
        }

        this.setFieldValidation(field, isValid, errorMessage);
        return isValid;
    }

    setFieldValidation(field, isValid, errorMessage) {
        const errorElement = document.getElementById(field.name + 'Error');

        if (isValid) {
            field.classList.remove('error');
            field.classList.add('success');
            if (errorElement) {
                errorElement.classList.remove('visible');
            }
        } else {
            field.classList.remove('success');
            field.classList.add('error');
            if (errorElement) {
                errorElement.textContent = errorMessage;
                errorElement.classList.add('visible');
            }
        }
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = document.getElementById(field.name + 'Error');
        if (errorElement) {
            errorElement.classList.remove('visible');
        }
    }

    validateForm() {
        let isValid = true;
        const fields = this.form.querySelectorAll('[name]');

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    async handleSubmit() {
        if (!this.validateForm()) {
            this.showNotification('Veuillez corriger les erreurs dans le formulaire', 'error');
            return;
        }

        this.setLoading(true);

        try {
            // Simuler l'envoi du formulaire (remplace par ton endpoint réel)
            await this.simulateFormSubmission();

            this.showSuccess();
            this.resetForm();

        } catch (error) {
            console.error('Erreur lors de l\'envoi:', error);
            this.showNotification('Une erreur est survenue. Veuillez réessayer.', 'error');
        } finally {
            this.setLoading(false);
        }
    }

    async simulateFormSubmission() {
    const formData = this.getFormData();

    try {
        const response = await fetch('https://formspree.io/f/xgvrolgb', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error(`Erreur serveur: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('Email envoyé avec succès:', result);
        return result;

    } catch (error) {
        console.error('Erreur lors de l\'envoi:', error);
        throw error;
    }
}
    // async simulateFormSubmission() {
        // Simuler un délai d'envoi
    //     return new Promise((resolve) => {
    //         setTimeout(() => {
    //             console.log('Formulaire envoyé avec les données:', this.getFormData());
    //             resolve();
    //         }, 2000);
    //     });
    // }

    getFormData() {
        const formData = new FormData(this.form);
        const data = {};
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        return data;
    }

    setLoading(loading) {
        if (loading) {
            this.submitBtn.disabled = true;
            this.loadingSpinner.style.display = 'block';
            this.submitText.textContent = 'Envoi en cours...';
            this.submitIcon.style.display = 'none';
        } else {
            this.submitBtn.disabled = false;
            this.loadingSpinner.style.display = 'none';
            this.submitText.textContent = 'Envoyer ma demande';
            this.submitIcon.style.display = 'inline';
        }
    }

    showSuccess() {
        this.form.style.display = 'none';
        this.successMessage.classList.add('visible');

        // Cacher le formulaire après 5 secondes
        setTimeout(() => {
            this.hideForm();
        }, 5000);
    }

    resetForm() {
        this.form.reset();
        this.form.style.display = 'block';
        this.successMessage.classList.remove('visible');

        // Nettoyer les styles de validation
        const fields = this.form.querySelectorAll('.form-input, .form-select, .form-textarea, .checkbox-input');
        fields.forEach(field => {
            field.classList.remove('error', 'success');
        });

        const errorMessages = this.form.querySelectorAll('.error-message');
        errorMessages.forEach(msg => {
            msg.classList.remove('visible');
        });
    }

    showNotification(message, type = 'info') {
        // Créer une notification simple
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            max-width: 400px;
        `;

        if (type === 'error') {
            notification.style.background = 'var(--accent-color)';
        } else if (type === 'success') {
            notification.style.background = 'var(--success-color)';
        } else {
            notification.style.background = 'var(--primary-color)';
        }

        notification.textContent = message;
        document.body.appendChild(notification);

        // Supprimer la notification après 4 secondes
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
}

// Initialiser le gestionnaire de formulaire quand la page est chargée
document.addEventListener('DOMContentLoaded', () => {
    new ContactFormManager();
});
