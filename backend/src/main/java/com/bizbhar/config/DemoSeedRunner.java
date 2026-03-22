package com.bizbhar.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DemoSeedRunner implements CommandLineRunner {

    private final DemoSeedService demoSeedService;

    public DemoSeedRunner(DemoSeedService demoSeedService) {
        this.demoSeedService = demoSeedService;
    }

    @Override
    public void run(String... args) {
        demoSeedService.seedIfNeeded();
    }
}
