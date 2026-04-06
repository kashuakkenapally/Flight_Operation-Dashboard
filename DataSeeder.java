package com.flightops.config;

import com.flightops.model.Flight;
import com.flightops.repository.FlightRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final FlightRepository flightRepository;

    @Override
    public void run(String... args) {
        log.info("Seeding flight data...");

        List<Flight> flights = List.of(
            Flight.builder().flightNumber("UA-101").origin("ORD").destination("LAX")
                .scheduledDeparture(LocalDateTime.now().plusHours(2))
                .scheduledArrival(LocalDateTime.now().plusHours(6))
                .status(Flight.FlightStatus.SCHEDULED).aircraftType("Boeing 737").gate("B12").build(),

            Flight.builder().flightNumber("UA-202").origin("LAX").destination("JFK")
                .scheduledDeparture(LocalDateTime.now().plusHours(1))
                .scheduledArrival(LocalDateTime.now().plusHours(6))
                .status(Flight.FlightStatus.BOARDING).aircraftType("Airbus A320").gate("C4").build(),

            Flight.builder().flightNumber("UA-303").origin("JFK").destination("MIA")
                .scheduledDeparture(LocalDateTime.now().minusHours(1))
                .scheduledArrival(LocalDateTime.now().plusHours(2))
                .actualDeparture(LocalDateTime.now().minusHours(1))
                .status(Flight.FlightStatus.IN_FLIGHT).aircraftType("Boeing 757").gate("A7").build(),

            Flight.builder().flightNumber("UA-404").origin("MIA").destination("ORD")
                .scheduledDeparture(LocalDateTime.now().plusHours(3))
                .scheduledArrival(LocalDateTime.now().plusHours(7))
                .status(Flight.FlightStatus.DELAYED).delayMinutes(45)
                .delayReason("Air traffic congestion").aircraftType("Boeing 737").gate("D22").build(),

            Flight.builder().flightNumber("UA-505").origin("SFO").destination("SEA")
                .scheduledDeparture(LocalDateTime.now().minusHours(4))
                .scheduledArrival(LocalDateTime.now().minusHours(2))
                .actualDeparture(LocalDateTime.now().minusHours(4))
                .actualArrival(LocalDateTime.now().minusHours(2))
                .status(Flight.FlightStatus.ARRIVED).aircraftType("Embraer E175").gate("F1").build(),

            Flight.builder().flightNumber("UA-606").origin("DEN").destination("ATL")
                .scheduledDeparture(LocalDateTime.now().plusHours(5))
                .scheduledArrival(LocalDateTime.now().plusHours(8))
                .status(Flight.FlightStatus.CANCELLED).delayReason("Mechanical issue").aircraftType("Airbus A319").gate("G9").build()
        );

        flightRepository.saveAll(flights);
        log.info("Seeded {} flights", flights.size());
    }
}
