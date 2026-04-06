package com.flightops.controller;

import com.flightops.model.Flight;
import com.flightops.model.FlightDTO;
import com.flightops.service.FlightService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/flights")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class FlightController {

    private final FlightService flightService;

    @GetMapping
    public ResponseEntity<List<FlightDTO>> getAllFlights() {
        return ResponseEntity.ok(flightService.getAllFlights());
    }

    @GetMapping("/{flightNumber}")
    public ResponseEntity<FlightDTO> getFlightByNumber(@PathVariable String flightNumber) {
        return flightService.getFlightByNumber(flightNumber)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<FlightDTO> createFlight(@Valid @RequestBody FlightDTO dto) {
        return ResponseEntity.ok(flightService.createFlight(dto));
    }

    @PatchMapping("/{flightNumber}/status")
    public ResponseEntity<FlightDTO> updateStatus(
            @PathVariable String flightNumber,
            @RequestParam Flight.FlightStatus status,
            @RequestParam(required = false) String reason) {
        return flightService.updateFlightStatus(flightNumber, status, reason)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/summary")
    public ResponseEntity<Map<String, Object>> getOperationalSummary() {
        return ResponseEntity.ok(flightService.getOperationalSummary());
    }

    @GetMapping("/window")
    public ResponseEntity<List<FlightDTO>> getFlightsByWindow(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        return ResponseEntity.ok(flightService.getFlightsByTimeWindow(start, end));
    }
}
