/**
 * 🌿 PHYLLUX INVENTION GENERATOR 🌿
 * DQ (Data Quality) idea generation with leak detection
 * Prevents trade secret exposure, ensures Track 1 only
 */

const GOLDEN_ANGLE = 137.508;
const GOLDEN_RATIO = 1.6180339887;
const FIBONACCI = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];

// Track 1 keywords (allowed)
const TRACK1_KEYWORDS = [
    'patent', 'licensing', 'business', 'engineering', 'IP', 'invention',
    'technology', 'innovation', 'commercial', 'revenue', 'market',
    'industry', 'application', 'product', 'system', 'device', 'method',
    'process', 'algorithm', 'architecture', 'design', 'framework'
];

// Track 2 keywords (blocked - medical advice, therapy, etc.)
const TRACK2_KEYWORDS = [
    'diagnose', 'treat', 'cure', 'therapy', 'medical advice', 'prescription',
    'diagnosis', 'treatment', 'therapeutic', 'clinical', 'patient care',
    'medical procedure', 'surgery', 'medication', 'drug', 'pharmaceutical'
];

// Trade secret indicators (warn about)
const TRADE_SECRET_INDICATORS = [
    'exact formula', 'specific parameters', 'proprietary', 'confidential',
    'secret recipe', 'undisclosed', 'internal only', 'not for public',
    'trade secret', 'classified', 'restricted'
];

// Safety language (required)
const SAFETY_LANGUAGE = [
    'research-stage', 'simulation-based', 'theoretical', 'conceptual',
    'requires validation', 'needs testing', 'preliminary', 'experimental',
    'caveats', 'disclaimers', 'regulatory approval', 'FDA', 'standards'
];

class InventionGenerator {
    constructor() {
        this.inventions = [];
        this.warnings = [];
        this.errors = [];
    }

    /**
     * Generate invention concept with DQ checks
     */
    generateInvention(seed) {
        const category = this.categorize(seed);
        const invention = {
            id: this.generateId(),
            title: this.generateTitle(seed),
            description: this.generateDescription(seed, category),
            category: category,
            status: 'research-stage',
            safety: this.addSafetyLanguage(),
            risks: this.identifyRisks(seed),
            licensing: this.suggestLicensing(seed),
            timestamp: new Date().toISOString()
        };

        // DQ checks
        const checks = this.performDQChecks(invention);
        invention.dqStatus = checks.status;
        invention.warnings = checks.warnings;
        invention.errors = checks.errors;

        return invention;
    }

    /**
     * Generate unique ID using Fibonacci pattern
     */
    generateId() {
        const timestamp = Date.now();
        const fibIndex = timestamp % FIBONACCI.length;
        return `PHY-${FIBONACCI[fibIndex]}-${timestamp}`;
    }

    /**
     * Generate title from seed
     */
    generateTitle(seed) {
        // Simple title generation (expand as needed)
        const prefixes = ['Phyllux', 'Golden', 'Fibonacci', 'Spiral'];
        const suffixes = ['System', 'Framework', 'Technology', 'Method'];
        
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
        
        return `${prefix} ${suffix}`;
    }

    /**
     * Generate description from seed and category
     */
    generateDescription(seed, category) {
        return `Research-stage invention concept based on phyllotactic patterns. ` +
               `Simulations suggest potential applications in ${category}. ` +
               `Requires validation and regulatory approval.`;
    }

    /**
     * Categorize invention
     */
    categorize(seed) {
        const categories = [
            'communications', 'energy', 'security', 'networking',
            'computing', 'materials', 'manufacturing', 'biotechnology'
        ];
        return categories[Math.floor(Math.random() * categories.length)];
    }

    /**
     * Add required safety language
     */
    addSafetyLanguage() {
        return {
            status: 'research-stage',
            validation: 'requires-validation',
            regulatory: 'approval-required',
            disclaimers: 'standard-caveats-applied'
        };
    }

    /**
     * Identify risks
     */
    identifyRisks(seed) {
        return [
            'Research-stage technology requires validation',
            'Simulations may not reflect real-world performance',
            'Regulatory approval may be required',
            'Market acceptance uncertain'
        ];
    }

    /**
     * Suggest licensing tier
     */
    suggestLicensing(seed) {
        return {
            tier1: 'Pioneer companies (world-changing missions)',
            tier2: 'Mission-aligned organizations',
            tier3: 'Commercial companies',
            tier4: 'Research and education (free)'
        };
    }

    /**
     * Perform Data Quality checks
     */
    performDQChecks(invention) {
        const checks = {
            status: 'pass',
            warnings: [],
            errors: []
        };

        const text = JSON.stringify(invention).toLowerCase();

        // Check for Track 2 content (blocked)
        for (const keyword of TRACK2_KEYWORDS) {
            if (text.includes(keyword.toLowerCase())) {
                checks.errors.push(`Track 2 keyword detected: ${keyword}`);
                checks.status = 'fail';
            }
        }

        // Check for trade secret indicators (warn)
        for (const indicator of TRADE_SECRET_INDICATORS) {
            if (text.includes(indicator.toLowerCase())) {
                checks.warnings.push(`Possible trade secret indicator: ${indicator}`);
            }
        }

        // Check for safety language (required)
        let hasSafetyLanguage = false;
        for (const safety of SAFETY_LANGUAGE) {
            if (text.includes(safety.toLowerCase())) {
                hasSafetyLanguage = true;
                break;
            }
        }

        if (!hasSafetyLanguage) {
            checks.warnings.push('Missing required safety language (research-stage, simulations, caveats)');
        }

        // Check for Track 1 alignment
        let hasTrack1 = false;
        for (const keyword of TRACK1_KEYWORDS) {
            if (text.includes(keyword.toLowerCase())) {
                hasTrack1 = true;
                break;
            }
        }

        if (!hasTrack1) {
            checks.warnings.push('Limited Track 1 keywords - ensure patent/business/IP focus');
        }

        return checks;
    }

    /**
     * Detect potential leaks
     */
    detectLeaks(text) {
        const leaks = [];

        // Check for specific parameters
        const parameterPattern = /(\d+\.\d+%?|\d+%?)/g;
        const matches = text.match(parameterPattern);
        if (matches && matches.length > 5) {
            leaks.push('Multiple specific parameters detected - may be trade secrets');
        }

        // Check for proprietary formulas
        if (text.includes('formula') && !text.includes('general')) {
            leaks.push('Specific formula mentioned - ensure it\'s not proprietary');
        }

        // Check for manufacturing details
        if (text.includes('manufacturing') && text.includes('process')) {
            leaks.push('Manufacturing process details - may be trade secret');
        }

        return leaks;
    }

    /**
     * Generate safe invention (with all checks)
     */
    generateSafeInvention(seed) {
        let invention;
        let attempts = 0;
        const maxAttempts = 10;

        do {
            invention = this.generateInvention(seed);
            attempts++;
        } while (invention.dqStatus === 'fail' && attempts < maxAttempts);

        if (invention.dqStatus === 'fail') {
            console.warn('⚠️ Could not generate safe invention after', attempts, 'attempts');
        }

        return invention;
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InventionGenerator;
}

// Example usage
if (typeof require !== 'undefined' && require.main === module) {
    const generator = new InventionGenerator();
    
    console.log('🌿 Phyllux Invention Generator 🌿\n');
    
    const invention = generator.generateSafeInvention('test-seed');
    
    console.log('Generated Invention:');
    console.log(JSON.stringify(invention, null, 2));
    
    if (invention.warnings.length > 0) {
        console.log('\n⚠️ Warnings:');
        invention.warnings.forEach(w => console.log('  -', w));
    }
    
    if (invention.errors.length > 0) {
        console.log('\n❌ Errors:');
        invention.errors.forEach(e => console.log('  -', e));
    }
}
