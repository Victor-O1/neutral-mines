import mongoose from 'mongoose';

const MineSchema = new mongoose.Schema({
    Mine_ID: {
        type: Number,
        required: true,
        unique: true,
    },
    Mine_Name: {
        type: String,
        required: true,
    },
    Mine_Type: {
        type: String,

        required: true,
    },
    State: {
        type: String,
        required: true,
    },
    Latitude: {
        type: Number,
        required: true,
    },
    Longitude: {
        type: Number,
        required: true,
    },
    Coal_Production: {
        type: Number, // In tons
        required: true,
    },
    Area_Covered: {
        type: Number, // In square kilometers
        required: true,
    },
    Year_Started: {
        type: Number, // Year the mine started operation
        required: true,
    },
    Fuel_Consumption: {
        type: Number, // In liters or tons, depending on the unit
        required: true,
    },
    Electricity_Consumption: {
        type: Number, // In MWh or kWh
        required: true,
    },
    Explosives_Used: {
        type: Number, // In kilograms or tons
        required: true,
    },
    Methane_Emissions: {
        type: Number, // In metric tons of CH4
        required: true,
    },
    Fugitive_Emissions: {
        type: Number, // In metric tons of CO2-equivalent
        required: true,
    },
    CO2_Emissions: {
        type: Number, // In metric tons of CO2
        required: true,
    },
    CH4_CO2e: {
        type: Number, // Methane emissions in CO2-equivalent
        required: true,
    },
    Afforestation_Potential: {
        type: Number, // In hectares
        required: true,
    },
    Trees_Plantable: {
        type: Number, // Number of trees that can be planted
        required: true,
    },
    Carbon_Sequestration_Potential: {
        type: Number, // In metric tons of CO2
        required: true,
    },
    Deforestation_Impact: {
        type: Number, // In metric tons of CO2-equivalent due to deforestation
        required: true,
    },
    Methane_Capture_Potential: {
        type: Number, // In metric tons of CH4 that can be captured
        required: true,
    },
    Energy_Efficiency_Gains: {
        type: Number, // In kWh or MWh savings
        required: true,
    },
    Electrification_Impact: {
        type: Number, // In kWh or MWh of electrification impact
        required: true,
    },
    Renewable_Adoption_Potential: {
        type: Number, // In kWh or MWh that can be generated from renewables
        required: true,
    },
    Carbon_Credits_Potential: {
        type: Number, // In metric tons of CO2-equivalent credits
        required: true,
    },
    Carbon_Credit_Value: {
        type: Number, // In currency units (e.g., USD per ton of CO2-equivalent)
        required: true,
    },
    Estimated_Revenue_from_Credits: {
        type: Number, // Estimated revenue from carbon credits
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

export default mongoose.models.mines1 || mongoose.model('mines1', MineSchema);
