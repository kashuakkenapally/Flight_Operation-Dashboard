package com.flightops.service;

import com.flightops.model.Flight;
import com.flightops.model.FlightDTO;
import com.flightops.repository.FlightRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class FlightServiceTest {

    @Mock
    private FlightRepository flightRepository;

    @InjectMocks
    private FlightService flightService;

    private Flight sampleFlight;

    @BeforeEach
    void setUp() {
        sampleFlight = Flight.builder()
                .id(1L)
                .flightNumber("UA-101")
                .origin("ORD")
                .destination("LAX")
                .scheduledDeparture(LocalDateTime.now().plusHours(2))
                .scheduledArrival(LocalDateTime.now().plusHours(6))
                .status(Flight.FlightStatus.SCHEDULED)
                .aircraftType("Boeing 737")
                .gate("B12")
                .build();
    }

    @Test
    @DisplayName("Should return all flights as DTOs")
    void getAllFlights_returnsAll() {
        when(flightRepository.findAll()).thenReturn(List.of(sampleFlight));

        List<FlightDTO> result = flightService.getAllFlights();

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getFlightNumber()).isEqualTo("UA-101");
        assertThat(result.get(0).getOrigin()).isEqualTo("ORD");
        verify(flightRepository, times(1)).findAll();
    }

    @Test
    @DisplayName("Should find flight by number")
    void getFlightByNumber_found() {
        when(flightRepository.findByFlightNumber("UA-101")).thenReturn(Optional.of(sampleFlight));

        Optional<FlightDTO> result = flightService.getFlightByNumber("UA-101");

        assertThat(result).isPresent();
        assertThat(result.get().getFlightNumber()).isEqualTo("UA-101");
    }

    @Test
    @DisplayName("Should return empty when flight not found")
    void getFlightByNumber_notFound() {
        when(flightRepository.findByFlightNumber("UNKNOWN")).thenReturn(Optional.empty());

        Optional<FlightDTO> result = flightService.getFlightByNumber("UNKNOWN");

        assertThat(result).isEmpty();
    }

    @Test
    @DisplayName("Should create flight with SCHEDULED status")
    void createFlight_setsScheduledStatus() {
        FlightDTO input = FlightDTO.builder()
                .flightNumber("UA-999")
                .origin("SFO")
                .destination("NYC")
                .scheduledDeparture(LocalDateTime.now().plusHours(3))
                .scheduledArrival(LocalDateTime.now().plusHours(9))
                .build();

        when(flightRepository.save(any(Flight.class))).thenAnswer(inv -> {
            Flight f = inv.getArgument(0);
            f.setId(99L);
            return f;
        });

        FlightDTO result = flightService.createFlight(input);

        assertThat(result.getFlightNumber()).isEqualTo("UA-999");
        verify(flightRepository).save(argThat(f -> f.getStatus() == Flight.FlightStatus.SCHEDULED));
    }

    @Test
    @DisplayName("Should update flight status to DELAYED with reason")
    void updateFlightStatus_delayed() {
        when(flightRepository.findByFlightNumber("UA-101")).thenReturn(Optional.of(sampleFlight));
        when(flightRepository.save(any())).thenReturn(sampleFlight);

        Optional<FlightDTO> result = flightService.updateFlightStatus("UA-101", Flight.FlightStatus.DELAYED, "Weather");

        assertThat(result).isPresent();
        verify(flightRepository).save(argThat(f ->
                f.getStatus() == Flight.FlightStatus.DELAYED &&
                "Weather".equals(f.getDelayReason())));
    }

    @Test
    @DisplayName("Should return operational summary with all keys")
    void getOperationalSummary_hasAllKeys() {
        when(flightRepository.count()).thenReturn(10L);
        when(flightRepository.countByStatus(any())).thenReturn(2L);
        when(flightRepository.getAverageDelayMinutes()).thenReturn(15.5);
        when(flightRepository.findSignificantDelays(30)).thenReturn(List.of());

        Map<String, Object> summary = flightService.getOperationalSummary();

        assertThat(summary).containsKeys("totalFlights", "scheduled", "inFlight",
                "delayed", "cancelled", "arrived", "averageDelayMinutes", "significantDelays");
        assertThat(summary.get("totalFlights")).isEqualTo(10L);
    }
}
