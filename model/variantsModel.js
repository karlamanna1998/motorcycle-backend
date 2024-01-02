const mongoose = require('mongoose');

const variantsScheem = new mongoose.Schema({
    variant_name : {
        required : true,
        type : 'string',
    },
    brand : {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    motorcycle : {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    price : {
        type : String,
        required : true
    },
    features: {
        touchScreenDisplay: {
            type: String,
            enum: ['', 'Yes', 'No'],
            default: '',
        },
        instrumentConsole: {
            type: String,
            enum: ['', 'Analogue', 'Digital'],
            default: '',
        },
        odometer: {
            type: String,
            enum: ['', 'Analogue', 'Digital'],
            default: '',
        },
        speedometer: {
            type: String,
            enum: ['', 'Analogue', 'Digital'],
            default: '',
        },
        fuelGauge: {
            type: String,
            enum: ['', 'Yes', 'No'],
            default: '',
        },
        digitalFuelGauge: {
            type: String,
            enum: ['', 'Yes', 'No'],
            default: '',
        },
        hazardWarningIndicator: {
            type: String,
            enum: ['', 'Yes', 'No'],
            default: '',
        },
        averageSpeedIndicator: {
            type: String,
            enum: ['', 'Yes', 'No'],
            default: '',
        },
        otaUpdates: {
            type: String,
            enum: ['Not Available', 'Available', ""],
            default: '',
        },
        callSMSAlerts: {
            type: String,
            enum: ['', 'Yes', 'No'],
            default: '',
        },
        geoFencing: {
            type: String,
            enum: ['', 'Yes', 'No'],
            default: '',
        },
        distanceToEmptyIndicator: {
            type: String,
            enum: ['', 'Yes', 'No'],
            default: '',
        },
        tachometer: {
            type: String,
            enum: ['', 'Yes', 'No'],
            default: '',
        },
        standAlarm: {
            type: String,
            enum: ['', 'Yes', 'No'],
            default: '',
        },
        numberOfTripmeters: {
            type: String,
            default: "",
        },
        tripmeterType: {
            type: String,
            enum: ['', 'Digital', 'Analogue'],
            default: '',
        },
        gearIndicator: {
            type: String,
            enum: ['', 'Yes', 'No'],
            default: '',
        },
        lowFuelIndicator: {
            type: String,
            enum: ['', 'Yes', 'No'],
            default: '',
        },
        lowOilIndicator: {
            type: String,
            enum: ['', 'Yes', 'No'],
            default: '',
        },
        lowBatteryIndicator: {
            type: String,
            enum: ['', 'Yes', 'No'],
            default: '',
        },
        clock: {
            type: String,
            enum: ['', 'Yes', 'No'],
            default: '',
        },
        serviceReminderIndicator: {
            type: String,
            enum: ['', 'Yes', 'No'],
            default: '',
        },
        battery: {
            type: String,
            default: '12 V, 8 AH MF battery',
        },
        frontStorageBox: {
            type: String,
            enum: ['', 'Yes', 'No'],
            default: '',
        },
        underSeatStorage: {
            type: String,
            enum: ['', 'Yes', 'No'],
            default: '',
        },
        mobileAppConnectivity: {
            type: String,
            enum: ['', 'Yes', 'No'],
            default: '',
        },
        drls: {
            type: String,
            enum: ['', 'Yes', 'No'],
            default: '',
        },
        aho: {
            type: String,
            enum: ['', 'Yes', 'No'],
            default: '',
        },
        shiftLight: {
            type: String,
            enum: ['', 'Yes', 'No'],
            default: '',
        },
        headlightType: {
            type: String,
            enum: ['', 'Halogen Bulb', 'LED'],
            default: '',
        },
        brakeTailLight: {
            type: String,
            enum: ['', 'Halogen Bulb', 'LED'],
            default: '',
        },
        turnSignal: {
            type: String,
            enum: ['', 'Halogen Bulb', 'LED'],
            default: '',
        },
        passLight: {
            type: String,
            enum: ['', 'Yes', 'No'],
            default: '',
        },
        gpsNavigation: {
            type: String,
            enum: ['', 'Yes', 'No'],
            default: '',
        },
        usbChargingPort: {
            type: String,
            enum: ['', 'Yes', 'No'],
            default: '',
        },
        ridingModesSwitch: {
            type: String,
            enum: ['', 'Yes', 'No'],
            default: '',
        },
        tractionControl: {
            type: String,
            enum: ['', 'Yes', 'No'],
            default: '',
        },
        cruiseControl: {
            type: String,
            enum: ['', 'Yes', 'No'],
            default: '',
        },
        hazardWarningSwitch: {
            type: String,
            enum: ['', 'Yes', 'No'],
            default: '',
        },
        startType: {
            type: String,
            enum: ['', 'Kick Start', 'Electric Start'],
            default: '',
        },
        killswitch: {
            type: String,
            enum: ['', 'Yes', 'No'],
            default: '',
        },
        steppedSeat: {
            type: String,
            enum: ['', 'Yes', 'No'],
            default: '',
        },
        pillionBackrest: {
            type: String,
            enum: ['', 'Yes', 'No'],
            default: '',
        },
        pillionGrabrail: {
            type: String,
            enum: ['', 'Yes', 'No'],
            default: '',
        },
        pillionSeat: {
            type: String,
            enum: ['', 'Yes', 'No'],
            default: '',
        },
        pillionFootrest: {
            type: String,
            enum: ['', 'Yes', 'No'],
            default: '',
        },
        frontSuspensionPreloadAdjuster: {
            type: String,
            enum: ['', 'Yes', 'No'],
            default: '',
        },
        rearSuspensionPreloadAdjuster: {
            type: String,
            enum: ['', 'Yes', 'No'],
            default: '',
        },
        additionalFeatures: {
            type: String,
            default: ''
        },
    },
    specifications: {
        displacement: {
            type: String,
            default: '',
        },
        maxPower: {
            type: String,
            default: '',
        },
        maxTorque: {
            type: String,
            default: '',
        },
        mileageOwnerReported: {
            type: String,
            default: '',
        },
        ridingRange: {
            type: String,
            default: '',
        },
        topSpeed: {
            type: String,
            default: '',
        },
        ridingModes: {
            type: String,
            default: '',
        },
        transmission: {
            type: String,
            default: '',
        },
        transmissionType: {
            type: String,
            default: '',
        },
        gearShiftingPattern: {
            type: String,
            default: '',
        },
        cylinders: {
            type: Number,
            default: 0,
        },
        bore: {
            type: String,
            default: '',
        },
        stroke: {
            type: String,
            default: '',
        },
        valvesPerCylinder: {
            type: String,
            default: '',
        },
        compressionRatio: {
            type: String,
            default: '',
        },
        ignition: {
            type: String,
            default: '',
        },
        sparkPlugs: {
            type: String,
            default: '',
        },
        coolingSystem: {
            type: String,
            default: '',
        },
        clutch: {
            type: String,
            default: '',
        },
        fuelDeliverySystem: {
            type: String,
            default: '',
        },
        fuelTankCapacity: {
            type: String,
            default: '',
        },
        reserveFuelCapacity: {
            type: String,
            default: '',
        },
        emissionStandard: {
            type: String,
            default: '',
        },
        fuelType: {
            type: String,
            default: '',
        },
        // Brakes, Wheels & Suspension Specifications
        frontSuspension: {
            type: String,
            default: '',
        },
        rearSuspension: {
            type: String,
            default: '',
        },
        brakingSystem: {
            type: String,
            default: '',
        },
        frontBrakeType: {
            type: String,
            default: '',
        },
        frontBrakeSize: {
            type: String,
            default: '',
        },
        rearBrakeType: {
            type: String,
            default: '',
        },
        rearBrakeSize: {
            type: String,
            default: '',
        },
        calliperType: {
            type: String,
            default: '',
        },
        wheelType: {
            type: String,
            default: '',
        },
        frontWheelSize: {
            type: String,
            default: '',
        },
        rearWheelSize: {
            type: String,
            default: '',
        },
        frontTyreSize: {
            type: String,
            default: '',
        },
        rearTyreSize: {
            type: String,
            default: '',
        },
        tyreType: {
            type: String,
            default: '',
        },
        radialTyres: {
            type: String,
            default: '',
        },
        frontTyrePressureRider: {
            type: String,
            default: '',
        },
        rearTyrePressureRider: {
            type: String,
            default: '',
        },
        frontTyrePressureRiderPillion: {
            type: String,
            default: '',
        },
        rearTyrePressureRiderPillion: {
            type: String,
            default: '',
        },
        kerbWeight: {
            type: String,
            default: '',
        },
        seatHeight: {
            type: String,
            default: '',
        },
        groundClearance: {
            type: String,
            default: '',
        },
        overallLength: {
            type: String,
            default: '',
        },
        overallWidth: {
            type: String,
            default: '',
        },
        overallHeight: {
            type: String,
            default: '',
        },
        wheelbase: {
            type: String,
            default: '',
        },
        chassisType: {
            type: String,
            default: '',
        },
    },
},{
    timestamps: true
})

module.exports = mongoose.model('variants', variantsScheem);